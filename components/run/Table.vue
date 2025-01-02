<template>
  <div>
    <div v-if="status === 'pending'">
      Načítání...
    </div>
    <ClientOnly>
      <div class="mx-auto my-4 grid grid-cols-3 min-[400px]:grid-cols-4 min-[860px]:grid-cols-7 gap-4 text-sm text-black justify-center">
        <div :class="`${statsCircleClass} bg-yellow-300`" title="Uběhnuté kilometry v aktuálním měsíci">
          {{ aktualniMesic }}/{{ aktualniRok }}
          <br>
          {{ kmZaAktualniMesic }}  km
        </div>
        <div :class="`${statsCircleClass} bg-yellow-300`" title="Uběhnuté kilometry v aktuálním roce">
          {{ aktualniRok }}
          <br>
          {{ kmZaAktualniRok }} km
        </div>
        <div :class="`${statsCircleClass} bg-green-300`" title="Nejvíc kilometrů za jeden měsíc">
          {{ nejlepsiMesic }}
          <br>
          {{ nejlepsiMesicKm }}
        </div>
        <div :class="`${statsCircleClass} bg-green-300`" title="Nejvíc kilometrů za jeden rok">
          {{ nejlepsiRok }}
          <br>
          {{ nejepsiRokKm }} km
        </div>
        <div :class="`${statsCircleClass} bg-sky-300`" title="Průměrně v tomto měsíci (od 2013)">
          ⌀ Měsíc
          <br>
          {{ prumerZaMesic }} km
        </div>
        <div :class="`${statsCircleClass} bg-sky-300`" title="Průměrně v jednom roce (od 2013)">
          ⌀ Rok
          <br>
          {{ prumerZaRok }} km
        </div>
        <div :class="`${statsCircleClass} bg-red-300 hidden min-[400px]:flex`" title="Celkem uběhnutých kilometrů (od 2013)">
          Celkem
          <br>
          <span class="text-xs">{{ getCelkem() }} km</span>
        </div>
      </div>
      <UTable :rows :columns :ui>
        <template #rdate-data="{ row }: RunTableData">
          {{ useDateFormat(row.rdate, 'DD.MM.YYYY') }}
        </template>
        <template #tname-data="{ row }: RunTableData">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="getTrackInfo(row)" />
        </template>
        <template #rlength-data="{ row }: RunTableData">
          {{ getLengthInfo(row) }} m
        </template>
        <template #rtime-data="{ row }: RunTableData">
          {{ parseTimeInfo(row.rtime) }}
        </template>
        <template #rspeed-data="{ row }: RunTableData">
          {{ row.rspeed }} km/h
        </template>
        <template #admin-data="{ row }: RunTableData">
          <div v-if="useLoginStore().login" class="cursor-pointer" title="Smazat" @click="deleteRun(row.rid)">
            X
          </div>
        </template>
      </UTable>
      <UPagination v-model="page" :page-count="pageCount" :total="data?.length || 0" class="justify-center" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// TODO re-think the logic to avoid relying on exposing refresh function into page component...
const updateRuns = async () => {
  await refresh()
}
defineExpose({ updateRuns })

const statsCircleClass = 'w-24 h-24 flex flex-col justify-center rounded-full'

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
}, {
  key: 'admin',
  label: '',
}]

const ui = {
  th: {
    base: 'text-center',
  },
}

// read data from Neon database
const { neonClient } = useNeon()
const { data, status, refresh } = await useAsyncData(() => neonClient`SELECT r.id as rId, r.date as rDate, t.id as tId, t.name as tName, t.dscr as tDscr, t.length as tLength, t.map_link as tMapLink, r.dscr as rDscr, r.length as rLength, r.time as rTime, r.speed as rSpeed FROM elrh_run_records r JOIN elrh_run_tracks t ON r.track = t.id ORDER BY r.date DESC`)

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

const aktualniDatum = new Date().toISOString()
const aktualniRok = aktualniDatum.slice(0, 4)
const aktualniMesic = aktualniDatum.slice(5, 7)

const kmZaAktualniMesic = getCelkemZaObdobi(aktualniRok, aktualniMesic)
const kmZaAktualniRok = getCelkemZaObdobi(aktualniRok)

const kmZaKazdyRok = {} as RunStats
const kmZaKazdyMesic = {} as RunStats
data.value?.forEach((run) => {
  const runRok = useDateFormat(run.rdate, 'YYYY').value
  const runMesic = useDateFormat(run.rdate, 'YYYY-MM').value

  if (!kmZaKazdyRok[runRok]) {
    kmZaKazdyRok[runRok] = 0
  }
  kmZaKazdyRok[runRok] += run.tid > 0 ? run.tlength : run.rlength

  if (!kmZaKazdyMesic[runMesic]) {
    kmZaKazdyMesic[runMesic] = 0
  }
  kmZaKazdyMesic[runMesic] += run.tid > 0 ? run.tlength : run.rlength
})

let nejlepsiRok = ''
let maxZaRok = 0
for (const rok in kmZaKazdyRok) {
  if (kmZaKazdyRok[rok] > maxZaRok) {
    maxZaRok = kmZaKazdyRok[rok]
    nejlepsiRok = rok
  }
}
const nejepsiRokKm = (maxZaRok / 1000).toFixed(1)

let nejlepsiMesic = ''
let maxZaMesic = 0
for (const mesic in kmZaKazdyMesic) {
  if (kmZaKazdyMesic[mesic] > maxZaMesic) {
    maxZaMesic = kmZaKazdyMesic[mesic]
    nejlepsiMesic = mesic
  }
}
nejlepsiMesic = nejlepsiMesic.split('-').reverse().join('/')
const nejlepsiMesicKm = (maxZaMesic / 1000).toFixed(1)

function getCelkemZaObdobi(rok: string, mesic?: string) {
  let totalYear = 0
  data.value?.forEach((run) => {
    let runCounts = false
    const runRok = useDateFormat(run.rdate, 'YYYY').value
    if (runRok === rok) {
      if (mesic) {
        const runMesic = useDateFormat(run.rdate, 'MM').value
        runCounts = runMesic === mesic
      } else {
        runCounts = true
      }
    }
    if (runCounts) {
      totalYear += run.tid > 0 ? run.tlength : run.rlength
    }
  })
  return (totalYear / 1000).toFixed(1)
}

let celkemZaVsechnyRoky = 0
let pocetLet = 0
for (const year in kmZaKazdyRok) {
  celkemZaVsechnyRoky += kmZaKazdyRok[year]
  pocetLet++
}
const prumerZaRok = ((celkemZaVsechnyRoky / pocetLet) / 1000).toFixed(1)

let celkemZaVsechnyMesice = 0
let pocetMesicu = 0
for (const mesic in kmZaKazdyMesic) {
  if (mesic.endsWith(aktualniMesic)) {
    celkemZaVsechnyMesice += kmZaKazdyMesic[mesic]
    pocetMesicu++
  }
}
const prumerZaMesic = ((celkemZaVsechnyMesice / pocetMesicu) / 1000).toFixed(1)

function getCelkem() {
  let totalMeters = 0
  data.value?.forEach((run) => {
    totalMeters += run.tid > 0 ? run.tlength : run.rlength
  })
  return (totalMeters / 1000).toFixed(1)
}

async function deleteRun(id: number) {
  if (confirm(`Smazat běh ID ${id}?`) == true) {
    const { neonClient, del } = useNeon()
    const result = await del(neonClient, 'elrh_run_records', [`id=${id}`])
    log.debug(result)
    alert('Smazáno')
    await refresh()
  }
}
</script>
