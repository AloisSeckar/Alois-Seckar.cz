<template>
  <div class="m-4 md:mx-auto w-full md:w-5/6 lg:w-3/4">
    <h2>Alois Sečkár - Běžecké statistiky</h2>
    <div class="text-left sm:text-justify">
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
    <div class="mb-6">
      <RunStats :runs="allRuns" />
    </div>
    <div class="mb-4">
      <RunFilter @filter="doFilter" />
    </div>
    <div class="mb-2">
      <div v-if="status === 'pending'">
        Načítání...
      </div>
      <RunTable
        v-else ref="runTable" :runs="displayedRuns"
        @filter="doFilterTrack" @sort="doSort" @delete="refresh"
      />
    </div>
    <!-- my personal login -->
    <div v-if="useLoginStore().login">
      <RunForm @add="refresh()" />
    </div>
    <div v-else>
      <div class="w-16 h-12 m-auto text-gray-800 cursor-pointer" @click="loginForm?.openDialog">
        A
      </div>
      <RunLogin ref="loginForm" />
    </div>
    <ThePageFooter />
  </div>
</template>

<script setup lang="ts">
import type { ComponentExposed } from 'vue-component-type-helpers'
import type RunLogin from '~/components/run/Login.vue'
import type RunTable from '~/components/run/Table.vue'

const loginForm = useTemplateRef<ComponentExposed<typeof RunLogin>>('loginForm')
const runTable = useTemplateRef<ComponentExposed<typeof RunTable>>('runTable')

const { data, status, refresh } = await useAsyncData(() => getRuns())

const allRuns = ref([] as RunRecord[])
const displayedRuns = ref([] as RunRecord[])

const runFilter = ref({
  sortColumn: 'rdate',
  sortDirection: 'desc',
} as RunFilter)

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

function doSort(column: string, direction: 'asc' | 'desc') {
  runFilter.value.sortColumn = column
  runFilter.value.sortDirection = direction
  filterRuns()
}

async function filterRuns() {
  const filteredRuns = await getRuns(runFilter.value)
  displayedRuns.value.length = 0
  displayedRuns.value.push(...filteredRuns)
}

watch(data, () => {
  allRuns.value.length = 0
  if (data.value) {
    const all = data.value as RunRecord[]
    allRuns.value.push(...all)
    filterRuns()
  }
}, { immediate: true })
</script>
