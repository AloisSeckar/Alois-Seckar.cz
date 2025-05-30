<template>
  <Vueform
    ref="form$"
    :endpoint="submitRun"
    method="post"
    @response="vueformResponse"
    @error="vueformError"
  >
    <StaticElement
      name="title"
      tag="h2"
      content="Nový běh"
    />
    <TextElement
      name="inputDate"
      label="Datum:"
      description="Datum ve formátu DDDD-MM-YY"
      placeholder="DDDD-MM-YY"
      :rules="[
        'required',
      ]"
    />
    <SelectElement
      name="inputTrack"
      label="Trasa:"
      description="Vybrete trasu, kterou jste běželi"
      :rules="[
        'required',
      ]"
      :items="tracks"
      @change="updateLength"
    />
    <TextElement
      v-model="inputLength"
      name="inputLength"
      label="Vzdálenost:"
      description="Délkaby běhu v metrech"
      :disabled="rLegthDisabled"
    />
    <TextElement
      name="inputTime"
      label="Čas:"
      description="Čas ve formátu [HH]:MM:SS:sss"
      :rules="[
        'required',
      ]"
    />
    <TextareaElement
      name="inputDscr"
      label="Popis"
      description="Popis běhu (nepovinný)"
    />
    <ButtonElement
      name="submit"
      button-label="Odeslat"
      :submits="true"
      :full="true"
      align="center"
    />
  </Vueform>
</template>

<script setup lang="ts">
const emits = defineEmits(['add'])

// get list of my running tracks
const { data } = await useAsyncData(() => getTracks())

const form = useTemplateRef('form$')
onMounted(() => {
  form.value?.update({
    inputDate: new Date().toISOString().slice(0, 10),
  })
})

const tracks = data.value?.map((t: TrackInfo) => {
  return {
    label: t.tname,
    value: t.tid.toString(),
    length: t.tlength,
  }
})
const inputTrack = ref<number>(tracks?.[0]?.value || -1)
const inputLength = ref(0)

const rLegthDisabled = ref(true)

const updateLength = () => {
  const data = form.value?.data as RunData
  inputTrack.value = parseInt(data?.inputTrack || '-1')
  if (inputTrack.value > -1) {
    inputLength.value = tracks?.find((t: SelectValue) => t.value === inputTrack.value.toString())?.length || 0
    rLegthDisabled.value = true
  } else {
    inputLength.value = 1
    rLegthDisabled.value = false
  }
  form.value?.update({
    inputLength: inputLength.value,
  })
}
updateLength()

type RunData = {
  inputDate: string
  inputTrack: string
  inputLength: number
  inputTime: string
  inputDscr: string
}
type VueformData = { data: RunData }

const submitRun = async (_FormData: unknown, form$: VueformData) => {
  const data = form$.data

  const run = {
    date: data.inputDate,
    track: data.inputTrack.toString(),
    dscr: data.inputDscr || '',
    length: data.inputLength.toString(),
    time: data.inputTime,
    speed: getAVGSpeed(data.inputTime, data.inputLength).toString(),
  }
  console.log(run)

  const { insert } = useNeon()
  const result = await insert({
    table: 'elrh_run_records',
    values: run,
  })

  if (result === 'OK') {
    return {
      status: 200,
      statusText: 'OK',
    }
  } else {
    return {
      status: 500,
      // statusText: formatNeonError(result as NeonError),¨
      statusText: result,
    }
  }
}

// @ts-expect-error noImplictAny
const vueformResponse = (response, _form$) => {
  if (response.status === 200) {
    log.debug('New record inserted')
    emits('add')
    alert('Vloženo')
  }
}

// @ts-expect-error noImplictAny
const vueformError = (error, details, _form$) => {
  log.error(error) // Error or AxiosError
  log.error(details) // Vueform's additional info
  alert('Error occured! (see logs for details)')
}
</script>
