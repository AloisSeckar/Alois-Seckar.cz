<template>
  <div class="w-full m-4 sm:w-96 sm:mx-auto flex flex-col gap-2 border border-primary rounded px-4 py-2">
    <div class="font-bold">
      Nový běh
    </div>
    <div>
      <label for="rDate">Datum:</label>
      <UInput
        id="rDate"
        v-model="inputDate"
        type="text"
      />
    </div>
    <div>
      <label for="rTrack">Trasa:</label>
      <USelect
        id="rTrack"
        v-model="inputTrack"
        :options="tracks"
        @change="updateLength"
      />
    </div>
    <div>
      <label for="rLength">Vzdálenost:</label>
      <UInput
        id="rLength"
        v-model="inputLength"
        type="number"
        :disabled="rLegthDisabled"
      />
    </div>
    <div>
      <label for="rTime">Čas:</label>
      <UInput
        id="rTime"
        v-model="inputTime"
        type="text"
      />
    </div>
    <div>
      <label for="rDscr">Popis:</label>
      <UTextarea
        id="rDscr"
        v-model="inputDscr"
      />
    </div>
    <div>
      <UButton @click="submitRun">
        Odeslat
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['add'])

// get list of my running tracks
const { data } = await useAsyncData(() => getTracks())

const inputDate = ref(new Date().toISOString().slice(0, 10))
const inputLength = ref(0)
const inputTime = ref('')
const inputDscr = ref('')

const tracks = data.value?.map((t: TrackInfo) => {
  return {
    label: t.tname,
    value: t.tid.toString(),
    length: t.tlength,
  }
})
const inputTrack = ref<number>(tracks?.[0]?.value || -1)

const rLegthDisabled = ref(true)

const updateLength = () => {
  if (inputTrack.value > -1) {
    inputLength.value = tracks?.find((t: SelectValue) => t.value === inputTrack.value)?.length || 0
    rLegthDisabled.value = true
  } else {
    inputLength.value = 0
    rLegthDisabled.value = false
  }
}
updateLength()

const submitRun = async () => {
  const columns = ['date', 'track', 'dscr', 'length', 'time', 'speed']
  const values = [
    inputDate.value,
    inputTrack.value.toString(),
    inputDscr.value,
    inputLength.value.toString(),
    inputTime.value,
    getAVGSpeed(inputTime.value, inputLength.value).toString(),
  ]
  log.debug(values)
  log.debug(columns)

  const { insert } = useNeon()
  const result = await insert('elrh_run_records', values, columns)

  if (result === 'OK') {
    log.debug('New record inserted')
    emits('add')
    alert('Vloženo')
  } else {
    log.error(result)
  }
}
</script>
