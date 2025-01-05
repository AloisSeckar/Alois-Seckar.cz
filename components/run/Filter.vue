<template>
  <div class="flex sm:flex-row gap-2 justify-center">
    <div class="flex flex-row">
      <label for="rTrack" class="mr-1">Trasa:</label>
      <USelect
        id="fTrack"
        v-model="inputTrack"
        :options="tracks"
      />
    </div>
    <div class="flex flex-row">
      <label for="rTrack" class="mr-1">Období:</label>
      <USelect
        id="fMonth"
        v-model="inputMonth"
        :options="months"
        :disabled="inputMonthDisabled"
      />
      <USelect
        id="fYear"
        v-model="inputYear"
        :options="years"
      />
    </div>
    <UButton @click="doFilter">
      Filtrovat
    </UButton>
    <UButton color="gray" variant="outline" @click="doReset">
      Obnovit výchozí
    </UButton>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  filter: [id: RunFilter]
}>()

const doFilter = () => {
  emits('filter', {
    track: inputTrack.value,
    month: inputMonth.value,
    year: inputYear.value,
  })
}

const doReset = () => {
  emits('filter', {})
}

// TODO this should be re-usable component (used both in Filter and Form)
// read track data from Neon database
const { neonClient } = useNeon()
const { data } = await useAsyncData(() => neonClient`SELECT t.id as tId, t.name as tName, t.length as tLength FROM elrh_run_tracks t ORDER BY t.name`)

const tracks = data.value?.map((t) => {
  return {
    label: t.tname,
    value: t.tid.toString(),
  }
})
tracks?.unshift({ label: 'Vše', value: 0 })
const inputTrack = ref<number>(tracks?.[0]?.value || -1)

const months = [] as SelectValue[]
for (let i = 1; i <= 12; i++) {
  const val = i.toString().padStart(2, '0')
  months.push({ label: val, value: i })
}
months?.unshift({ label: 'Vše', value: 0 })
const inputMonth = ref(0)
const inputMonthDisabled = ref(true)

const years = [] as SelectValue[]
const thisYear = new Date().getFullYear()
for (let i = thisYear; i >= 2013; i--) {
  const val = i.toString()
  years.push({ label: val, value: i })
}
years?.unshift({ label: 'Vše', value: 0 })
const inputYear = ref(0)
watch(inputYear, () => {
  if (inputYear.value > 0) {
    inputMonthDisabled.value = false
  } else {
    inputMonthDisabled.value = true
    inputMonth.value = 0
  }
})
</script>
