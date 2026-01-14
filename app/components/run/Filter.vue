<template>
  <ClientOnly>
    <Vueform
      ref="filterForm"
      class="border lg:border-0 border-[#2dd4bf] px-4 py-2">
      <SelectElement
        name="track"
        label="Trasa:"
        :items="tracks"
        :columns="{
          sm: { container: 6 },
          lg: { container: 6 },
        }"
        @change="doFilter" />
      <SelectElement
        name="month"
        label="Období:"
        :items="months"
        :disabled="inputMonthDisabled"
        :columns="{
          sm: { container: 3 },
          lg: { container: 2 },
        }"
        @change="doFilter" />
      <SelectElement
        name="year"
        class="align-bottom"
        :items="years"
        :columns="{
          sm: { container: 3 },
          lg: { container: 2 },
        }"
        @change="doFilter" />
      <ButtonElement
        name="reset"
        button-label="Výchozí"
        class="align-bottom"
        :columns="{
          lg: { container: 2 },
        }"
        :submits="false"
        @click="doReset" />
    </Vueform>
  </ClientOnly>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  filter: [id: RunFilter]
}>()

const inputMonthDisabled = ref(true)
const filterForm = useTemplateRef('filterForm')
const doFilter = () => {
  const data = filterForm.value?.data as RunFilter
  emits('filter', data)
  // month is disabled if year is not set
  if (data.year! > 0) {
    inputMonthDisabled.value = false
  } else {
    inputMonthDisabled.value = true
    filterForm.value?.update({
      month: null,
    })
  }
}

const doReset = () => {
  emits('filter', {})
  // also reset form values
  filterForm.value?.update({
    track: null,
    month: null,
    year: null,
  })
}

// get list of my running tracks
const { data } = useFetch<TrackInfo[]>('/tracks', { key: 'tracks-filter' })
const tracks = ref([] as SelectValue[])
watch(() => data.value, () => {
  tracks.value.length = 0
  data.value?.forEach((t: TrackInfo) => {
    tracks.value.push({
      label: t.tname,
      value: t.tid.toString(),
    })
  })
  tracks.value?.unshift({ label: 'Vše', value: '0' })
}, { immediate: true, deep: true })

// months 01 - 12
const months = [] as SelectValue[]
for (let i = 1; i <= 12; i++) {
  const val = i.toString().padStart(2, '0')
  months.push({ label: val, value: i.toString() })
}
months?.unshift({ label: 'Vše', value: '0' })

// years since 2013
const years = [] as SelectValue[]
const thisYear = new Date().getFullYear()
for (let i = thisYear; i >= 2013; i--) {
  const val = i.toString()
  years.push({ label: val, value: i.toString() })
}
years?.unshift({ label: 'Vše', value: '0' })
</script>

<style scoped>
.align-bottom {
  align-self: flex-end; /* Works in flex/grid parent */
}
</style>
