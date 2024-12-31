<template>
  <div>
    <div v-if="status === 'pending'">
      Načítání...
    </div>
    <ClientOnly>
      <UTable :rows :columns :ui>
        <template #rdate-data="{ row }: TableData">
          {{ useDateFormat(row.rdate, 'DD.MM.YYYY') }}
        </template>
        <template #tname-data="{ row }: TableData">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="getTrackInfo(row)" />
        </template>
        <template #rlength-data="{ row }: TableData">
          {{ getLengthInfo(row) }} m
        </template>
        <template #rtime-data="{ row }: TableData">
          {{ parseTimeInfo(row.rtime) }}
        </template>
        <template #rspeed-data="{ row }: TableData">
          {{ row.rspeed }} km/h
        </template>
      </UTable>
      <UPagination v-model="page" :page-count="pageCount" :total="data?.length || 0" class="justify-center" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// customize UTable
const columns = [{
  key: 'rdate',
  label: 'Datum',
}, {
  key: 'tname',
  label: 'Trasa',
}, {
  key: 'rlength',
  label: 'Vzdálenost',
}, {
  key: 'rtime',
  label: 'Čas',
}, {
  key: 'rspeed',
  label: '⌀ rychlost',
}]

const ui = {
  th: {
    base: 'text-center',
  },
}

// custom data types
type RunRecord = {
  rid: number
  rdate: string
  tid: number
  tname: string
  tdscr: string
  tlength: number
  tmaplink: string
  rdscr: string
  rlength: number
  rtime: string
  rspeed: string
}

type TableData = {
  row: RunRecord
}

// read data from Neon database
const { neonClient } = useNeon()
const { data, status } = await useAsyncData(() => neonClient`SELECT r.id as rId, r.date as rDate, t.id as tId, t.name as tName, t.dscr as tDscr, t.length as tLength, t.map_link as tMapLink, r.dscr as rDscr, r.length as rLength, r.time as rTime, r.speed as rSpeed FROM elrh_run_records r JOIN elrh_run_tracks t ON r.track = t.id ORDER BY r.date DESC`)

// UTable pagination
const page = ref(1)
const pageCount = data.value?.length ? data.value.length / 50 + 1 : 0

const rows = computed(() => {
  if (data.value) {
    return data.value.slice((page.value - 1) * pageCount, (page.value) * pageCount) as RunRecord[]
  } else {
    return [] as RunRecord[]
  }
})

// for regular tracks display their name with link+dscr
// for "-1" track there is no link...
function getTrackInfo(row: RunRecord) {
  if (row.tid > 0) {
    return `<a href="${row.tmaplink}" title="${row.tdscr}">${row.tname}</a>`
  } else {
    return `<span title="${row.rdscr}">Jednorázové</a>`
  }
}

// for regular tracks the length is stored in elrh_run_tracks
// for "-1" track the length is directly in elrh_run_records
function getLengthInfo(row: RunRecord) {
  if (row.tid > 0) {
    return row.tlength
  } else {
    return row.rlength
  }
}

// time is stored with ":" separator for all the parts
// but the last part (miliseconds) needs be separated by "."
function parseTimeInfo(time: string) {
  const index = time.lastIndexOf(':')
  return time.slice(0, index) + '.' + time.slice(index + 1)
}
</script>
