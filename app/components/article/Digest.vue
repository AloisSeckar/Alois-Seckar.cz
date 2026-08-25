<template>
  <div>
    <div v-if="loading" class="my-12 flex flex-col items-center gap-3">
      <div class="h-10 w-10 rounded-full border-4 border-teal-400/25 border-t-[#e1b400] animate-spin" />
      <span class="text-[#e1b400]">Načítání...</span>
    </div>
    <div v-else-if="status === 'error'" class="my-8 text-red-400">
      Seznam článků se nepodařilo načíst.
    </div>

    <!-- `!` overrides unlayered ignis.css resets for `ul`/`p` margins and `img` height -->
    <ul v-else class="list-none flex flex-col gap-6 p-0 m-0!">
      <li v-for="article in articles" :key="article.link">
        <UCard
          class="text-left ring-1 ring-teal-500/40 bg-slate-900/60 shadow-[0_0_12px_3px_#38b2ac] transition-shadow hover:shadow-[0_0_18px_5px_#38b2ac]">
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <img
              v-if="article.image"
              :src="article.image"
              :alt="article.title"
              loading="lazy"
              referrerpolicy="no-referrer"
              class="w-full sm:w-40 h-[120px]! object-cover rounded-lg shrink-0 border-2 border-[#e1b400]"
              @error="article.image = undefined">
            <div class="min-w-0 flex flex-col gap-2">
              <span class="font-mono text-sm text-[#e1b400]">
                {{ article.date }}
              </span>
              <NuxtLink :to="article.link" external target="_blank" class="font-bold text-lg leading-snug break-words">
                {{ article.title }}
              </NuxtLink>
              <p class="m-0! text-sm text-left sm:text-justify text-slate-300 break-words">
                {{ capitalizeDscr(article.dscr) }}
              </p>
            </div>
          </div>
        </UCard>
      </li>
    </ul>

    <div v-if="loadingMore" class="my-6 flex items-center justify-center gap-3">
      <div class="h-6 w-6 rounded-full border-[3px] border-teal-400/25 border-t-[#e1b400] animate-spin" />
      <span class="text-[#e1b400]">Načítám další...</span>
    </div>
    <div v-else-if="!canLoadMore && articles.length > 0" class="my-6 text-sm text-slate-400">
      To je vše, co zatím mám.
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  source: ArticleSource
}>()

const PAGE_SIZE = 10
const CACHE_TTL = 10 * 60 * 1000

type DigestCache = {
  items: ArticleItem[]
  canLoadMore: boolean
  fetchedAt: number
}

// keeps already loaded (and scrolled) items when navigating away and back
const cache = useState<Partial<Record<ArticleSource, DigestCache>>>('article-digest-cache', () => ({}))
const cached = computed(() => cache.value[props.source])

function fetchArticles(offset: number) {
  return $fetch<ArticleItem[]>('/get-articles', {
    query: { source: props.source, count: PAGE_SIZE, offset },
  })
}

// ensure first capital letter
function capitalizeDscr(dscr: string) {
  const text = dscr.trim()
  if (!text) {
    return ''
  }
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1)
  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}`
}

// client-only fetch
const { data, status } = useAsyncData(`article-digest-${props.source}`, () => fetchArticles(0), {
  server: false,
  lazy: true,
  getCachedData: () => {
    const entry = cached.value
    return entry && Date.now() - entry.fetchedAt < CACHE_TTL ? entry.items : undefined
  },
})
const loading = computed(() => status.value === 'idle' || status.value === 'pending')

const articles = computed(() => cached.value?.items ?? [])
const canLoadMore = computed(() => cached.value?.canLoadMore ?? false)
const loadingMore = ref(false)

watch(data, (value) => {
  // same reference means the data came from `getCachedData`
  if (!value || value === cached.value?.items) {
    return
  }
  cache.value[props.source] = {
    items: value,
    canLoadMore: value.length === PAGE_SIZE,
    fetchedAt: Date.now(),
  }
}, { immediate: true })

async function loadMore() {
  const entry = cached.value
  if (!entry) {
    return
  }
  loadingMore.value = true
  try {
    const next = await fetchArticles(entry.items.length)
    entry.items.push(...next)
    if (next.length < PAGE_SIZE) {
      entry.canLoadMore = false
    }
  } catch {
    entry.canLoadMore = false
  } finally {
    loadingMore.value = false
  }
}

useInfiniteScroll(
  () => import.meta.client ? window : null,
  loadMore,
  {
    distance: 200,
    canLoadMore: () => canLoadMore.value && !loadingMore.value,
  },
)
</script>
