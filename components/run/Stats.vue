<template>
  <div class="mx-4 min-[400px]:mx-auto my-4 grid grid-cols-3 min-[400px]:grid-cols-4 min-[861px]:grid-cols-7 max-[860px]:max-w-[500px] gap-4 text-sm text-black justify-center">
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
      {{ nejlepsiRokKm }} km
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
      <span class="text-xs">{{ celkemKm }} km</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { runs } = defineProps({
  runs: { type: Object as PropType<RunRecord[]>, required: true },
})

const statsCircleClass = 'w-24 h-24 flex flex-col justify-center rounded-full'

const aktualniDatum = new Date().toISOString()
const aktualniRok = aktualniDatum.slice(0, 4)
const aktualniMesic = aktualniDatum.slice(5, 7)

const kmZaAktualniMesic = ref('0')
const kmZaAktualniRok = ref('0')
const nejlepsiMesic = ref('0')
const nejlepsiMesicKm = ref('0')
const nejlepsiRok = ref('0')
const nejlepsiRokKm = ref('0')
const prumerZaMesic = ref('0')
const prumerZaRok = ref('0')

const celkemKm = computed(() => {
  let totalMeters = 0
  runs.forEach((run) => {
    totalMeters += run.tid > 0 ? run.tlength : run.rlength
  })
  return (totalMeters / 1000).toFixed(1)
})
watch(celkemKm, () => {
  // console.debug('celkem km changed to ' + celkemKm.value)

  kmZaAktualniMesic.value = getCelkemZaObdobi(aktualniRok, aktualniMesic)
  kmZaAktualniRok.value = getCelkemZaObdobi(aktualniRok)

  const { kmZaKazdyRok, kmZaKazdyMesic } = sumRuns()

  nejlepsiRok.value = ''
  let maxZaRok = 0
  for (const rok in kmZaKazdyRok) {
    if (kmZaKazdyRok[rok] > maxZaRok) {
      maxZaRok = kmZaKazdyRok[rok]
      nejlepsiRok.value = rok
    }
  }
  nejlepsiRokKm.value = (maxZaRok / 1000).toFixed(1)

  nejlepsiMesic.value = ''
  let maxZaMesic = 0
  for (const mesic in kmZaKazdyMesic) {
    if (kmZaKazdyMesic[mesic] > maxZaMesic) {
      maxZaMesic = kmZaKazdyMesic[mesic]
      nejlepsiMesic.value = mesic
    }
  }
  nejlepsiMesic.value = nejlepsiMesic.value.split('-').reverse().join('/')
  nejlepsiMesicKm.value = (maxZaMesic / 1000).toFixed(1)

  let celkemZaVsechnyRoky = 0
  let pocetLet = 0
  for (const year in kmZaKazdyRok) {
    celkemZaVsechnyRoky += kmZaKazdyRok[year]
    pocetLet++
  }
  prumerZaRok.value = ((celkemZaVsechnyRoky / pocetLet) / 1000).toFixed(1)

  let celkemZaVsechnyMesice = 0
  let pocetMesicu = 0
  for (const mesic in kmZaKazdyMesic) {
    if (mesic.endsWith(aktualniMesic)) {
      celkemZaVsechnyMesice += kmZaKazdyMesic[mesic]
      pocetMesicu++
    }
  }
  prumerZaMesic.value = ((celkemZaVsechnyMesice / pocetMesicu) / 1000).toFixed(1)
}, { immediate: true })

function sumRuns() {
  const kmZaKazdyRok = {} as RunStats
  const kmZaKazdyMesic = {} as RunStats
  runs.forEach((run) => {
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

  return {
    kmZaKazdyRok,
    kmZaKazdyMesic,
  }
}

function getCelkemZaObdobi(rok: string, mesic?: string) {
  let totalYear = 0
  runs.forEach((run) => {
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
</script>
