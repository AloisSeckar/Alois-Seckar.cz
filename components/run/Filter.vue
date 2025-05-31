<template>
  <Vueform
    ref="filterForm"
    class="sm:max-w-[800px] mx-auto flex flex-row items-center justify-center"
  >
    <StaticElement
      name="trackLabel"
      tag="div"
      style="margin-top: 5px;"
      content="Trasa:"
      :columns="{
        default: { container: 2 },
        lg: { container: 1 },
      }"
    />
    <SelectElement
      name="track"
      :items="tracks"
      :columns="{
        default: { container: 10 },
        lg: { container: 4 },
      }"
      @change="doFilter"
    />
    <StaticElement
      name="timeLabel"
      tag="div"
      style="margin-top: 5px;"
      content="Období:"
      :columns="{
        default: { container: 2 },
        lg: { container: 1 },
      }"
    />
    <SelectElement
      name="month"
      :items="months"
      :columns="{
        default: { container: 5 },
        lg: { container: 2 },
      }"
      :disabled="inputMonthDisabled"
      @change="doFilter"
    />
    <SelectElement
      name="year"
      :items="years"
      :columns="{
        default: { container: 5 },
        lg: { container: 2 },
      }"
      @change="doFilter"
    />
    <ButtonElement
      name="reset"
      button-label="Výchozí"
      :submits="false"
      :columns="{
        default: { container: 12 },
        lg: { container: 2 },
      }"
      align="center"
      @click="doReset"
    />
  </Vueform>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  filter: [id: RunFilter]
}>()

const inputMonthDisabled = ref(true)
const filterForm = useTemplateRef('filterForm')
const doFilter = () => {
  const data = filterForm.value?.data as RunFilter
  console.log('doFilter', data)
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
const { data } = await useAsyncData(() => getTracks())
const tracks = data.value?.map((t: TrackInfo) => {
  return {
    label: t.tname,
    value: t.tid.toString(),
  }
})
tracks?.unshift({ label: 'Vše', value: 0 })

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
