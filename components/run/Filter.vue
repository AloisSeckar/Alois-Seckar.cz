<template>
  <div class="flex flex-col min-[725px]:flex-row gap-2 justify-center max-[724px]:items-center">
    <div class="flex gap-1">
      <label for="rTrack" class="mr-1">Trasa:</label>
      <USelect
        id="fTrack"
        v-model="inputTrack"
        :items="tracks"
        class="w-36"
        @change="doFilter"
      />
    </div>
    <div class="flex gap-1">
      <label for="rTrack" class="mr-1">Období:</label>
      <USelect
        id="fMonth"
        v-model="inputMonth"
        :items="months"
        :disabled="inputMonthDisabled"
        @change="doFilter"
      />
      <USelect
        id="fYear"
        v-model="inputYear"
        :items="years"
        @change="doFilter"
      />
    </div>
    <UButton color="neutral" variant="outline" @click="doReset">
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

// get list of my running tracks
const { data } = await useAsyncData(() => getTracks())
const tracks = data.value?.map((t: TrackInfo) => {
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
