<template>
  <div class="m-4 md:mx-auto">
    <h2>Alois Sečkár - Běžecké statistiky</h2>
    <div class="text-left sm:text-justify mx-2">
      Přehled mých běžeckých výkonů. Uchovává se datum, vzdálenost, čas a&nbsp;průměrná rychlost.
      Je tu vidět kompletní historie od roku 2013, kdy jsem s&nbsp;běháním začal.
      Tato stránka je zároveň hlavní referenční implementací mého integračního modulu
      <NuxtLink to="https://www.npmjs.com/package/nuxt-neon">
        nuxt-neon
      </NuxtLink>
      poskytovaného jako volitelný DB modul v&nbsp;projektu
      <NuxtLink to="https://www.npmjs.com/package/nuxt-ignis">
        Nuxt Ignis
      </NuxtLink>
    </div>
    <div v-if="loading" class="my-8 text-[#e1b400]">
      Načítání...
    </div>
    <ClientOnly>
      <UApp>
        <div class="mb-6">
          <RunStats ref="runStats" />
        </div>
        <div class="mx-2 mb-4">
          <RunFilter @filter="doFilter" />
        </div>
        <div class="mb-2">
          <div v-if="status === 'pending'">
            Načítání...
          </div>
          <RunTable
            v-else ref="runTable" :runs="data!"
            @filter="doFilterTrack" @sort="doSort" @delete="refresh" />
        </div>
        <div v-if="allowInsert" class="mt-6">
          <RunForm @add="refreshRuns" />
          <UButton
            class="mt-4"
            label="Logout"
            color="neutral"
            size="xs"
            external
            @click="clear()" />
        </div>
        <div v-else>
          <UButton
            to="/auth/github"
            label="A"
            variant="ghost"
            size="xs"
            external />
        </div>
      </UApp>
    </ClientOnly>
    <ThePageFooter />
  </div>
</template>

<script setup lang="ts">
import type { SortDirection } from '@tanstack/vue-table'
import type { ComponentExposed } from 'vue-component-type-helpers'
import type RunStats from '~/components/run/Stats.vue'

const { loggedIn, clear } = useUserSession()
const allowInsert = ref(false)
watchEffect(async () => {
  allowInsert.value = loggedIn.value && await $fetch<boolean>('/auth/login')
})

const runStats = useTemplateRef<ComponentExposed<typeof RunStats>>('runStats')

const runFilter = ref({
  sortColumn: 'rdate',
  sortDirection: 'DESC',
} as RunFilter)

const { data, status, refresh } = useFetch<RunRecord[]>('/runs', { method: 'POST', body: runFilter.value, key: 'runs' })

function doFilter(filter: RunFilter) {
  runFilter.value.track = filter?.track
  runFilter.value.year = filter?.year && filter.year > 0 ? filter?.year : undefined
  runFilter.value.month = filter?.month && filter.month > 0 ? filter?.month : undefined
  filterRuns()
}

function doFilterTrack(tid: number) {
  runFilter.value.track = tid
  filterRuns()
}

function doSort(column: string, direction: SortDirection) {
  runFilter.value.sortColumn = column
  runFilter.value.sortDirection = direction === 'asc' ? 'ASC' : 'DESC' // TODO fix once solved in nuxt-neon (issue opened https://github.com/AloisSeckar/nuxt-neon/issues/46)
  filterRuns()
}

async function filterRuns() {
  await refresh()
}

async function refreshRuns() {
  await refresh()
  runStats.value?.refreshStats()
}

const loading = ref(true)
onMounted(() => {
  if (import.meta.client) {
    loading.value = false
  }
})
</script>
