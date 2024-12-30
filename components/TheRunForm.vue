<template>
  <div class="w-full m-4 sm:w-96 flex flex-col gap-2 border border-primary rounded px-4 py-2">
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
// read track data from Neon database
const { neonClient } = useNeon()
const { data } = await useAsyncData(() => neonClient`SELECT t.id as tId, t.name as tName, t.length as tLength FROM elrh_run_tracks t ORDER BY t.name`)

const inputDate = ref(new Date().toISOString().slice(0, 10))
const inputLength = ref(0)
const inputTime = ref('')
const inputDscr = ref('')

console.log(data.value)
const tracks = data.value?.map((t) => {
  return {
    label: t.tname,
    value: t.tid.toString(),
    length: t.tlength,
  }
})
console.log(tracks)
const inputTrack = ref(tracks?.[0]?.value || -1)

const updateLength = () => {
  if (inputTrack.value > -1) {
    inputLength.value = tracks?.find(t => t.value === inputTrack.value)?.length || 0
  } else {
    inputLength.value = 0
  }
}
updateLength()

const submitRun = () => {
  console.log('Submitted')
}
</script>
