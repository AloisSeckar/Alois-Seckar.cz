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

const { select, raw } = useNeon()
const columns = ['r.id as rId', 'r.date as rDate', 't.id as tId', 't.name as tName', 't.dscr as tDscr', 't.length as tLength', 't.map_link as tMapLink', 'r.dscr as rDscr', 'r.length as rLength', 'r.time as rTime', 'r.speed as rSpeed']
const tables = ['elrh_run_records r', 'elrh_run_tracks t ON r.track = t.id'] // TODO fix JOIN in upstream
const order = 'r.date DESC' // TODO implement more columns when possible
const { data, status, refresh } = await useAsyncData(() => select(columns, tables, undefined, order))

const allRuns = ref([] as RunRecord[])
const displayedRuns = ref([] as RunRecord[])

const runFilter = ref({
  sortColumn: 'rdate',
  sortDirection: 'desc',
} as RunFilter)

function doFilter(filter: RunFilter) {
  runFilter.value.track = filter?.track
  runFilter.value.year = filter?.year
  runFilter.value.month = filter?.month
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
  const filter = runFilter.value

  // TODO rewrite into `select` wrapper
  let sql = `SELECT r.id as rId, r.date as rDate, t.id as tId, t.name as tName, t.dscr as tDscr, t.length as tLength, t.map_link as tMapLink, r.dscr as rDscr, r.length as rLength, r.time as rTime, r.speed as rSpeed FROM elrh_run_records r JOIN elrh_run_tracks t ON r.track = t.id`
  const where = [] as string[]

  if (filter.track && filter.track > 0) {
    where.push(`t.id = ${filter.track}`)
  }

  if (filter.year && filter.year > 0) {
    where.push(getSQLForDatePeriod(filter.year, filter.month))
  }

  if (where.length > 0) {
    sql += ' WHERE ' + where.join(' AND ')
  }

  if (filter.sortColumn) {
    if (filter.sortColumn === 'rdate') {
      sql += ` ORDER BY r.date`
    } else if (filter.sortColumn === 'rspeed') {
      sql += ` ORDER BY r.speed`
    }

    if (filter.sortDirection === 'desc') {
      sql += ` DESC`
    }
  }

  log.debug('filtering runs using:')
  log.debug(sql)

  const filteredRuns = await raw(sql) as RunRecord[]

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

function getSQLForDatePeriod(year: number, month?: number): string {
  const lastDay = new Date(year, month || 12, 0).getDate()
  const monthStr = String(month).padStart(2, '0')
  const fromDate = `${year}-${month ? monthStr : '01'}-01`
  const toDate = `${year}-${month ? monthStr : '12'}-${lastDay}`
  return `r.date BETWEEN '${fromDate}' AND '${toDate}'`
}
</script>
