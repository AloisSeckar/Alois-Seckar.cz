<template>
  <div>
    <div>Celkem: {{ runs.length }}</div>
    <UPagination v-model="page" :page-count="30" :total="runs.length || 0" class="justify-center mt-2" />
    <UTable v-model:sort="sort" :rows :columns :ui>
      <template #rdate-data="{ row }: RunTableData">
        {{ useDateFormat(row.rdate, 'DD.MM.YYYY') }}
      </template>
      <template #tname-data="{ row }: RunTableData">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="inline" v-html="getTrackInfo(row)" />
        <div
          v-if="row.tid > 0"
          class="inline cursor-pointer hover:text-amber-300"
          title="Filtrovat" @click="filterTrack(row.tid)"
        >
          &#9660;
        </div>
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
    <UPagination v-model="page" :page-count="30" :total="runs.length || 0" class="justify-center mb-2" />
    <div>Celkem: {{ runs.length }}</div>
  </div>
</template>

<script setup lang="ts">
const { runs } = defineProps({
  runs: { type: Object as PropType<RunRecord[]>, required: true },
})

const emits = defineEmits<{
  filter: [tid: number]
  sort: [column: string, direction: 'asc' | 'desc']
  delete: []
}>()

// customize UTable
const columns = [{
  key: 'rdate',
  label: 'Datum',
  sortable: true,
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
  sortable: true,
}, {
  key: 'admin',
  label: '',
}]

const sort = ref({
  column: 'rdate',
  direction: 'desc' as 'asc' | 'desc',
})
watch(sort, () => emits('sort', sort.value.column, sort.value.direction), { deep: true })

const ui = {
  th: {
    base: 'text-center',
  },
}

// UTable pagination
const page = ref(1)
const rows = computed(() => {
  return runs.slice((page.value - 1) * 30, (page.value) * 30)
})

// for regular tracks display their name with link+dscr
// for "-1" track there is no link...
function getTrackInfo(row: RunRecord) {
  const dscr = row.rdscr ? row.rdscr : row.tdscr
  if (row.tid > 0) {
    return `<a href="${row.tmaplink}" title="${dscr}">${row.tname}</a>`
  } else {
    return `<span title="${dscr}">Jednorázové</a>`
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

function filterTrack(tid: number) {
  emits('filter', tid)
}

async function deleteRun(id: number) {
  if (confirm(`Smazat běh ID ${id}?`) == true) {
    const { del } = useNeon()
    const result = await del('elrh_run_records', [`id=${id}`])

    if (result === 'OK') {
      log.debug(`Record ${id} deleted`)
      alert('Smazáno')
      emits('delete')
    } else {
      log.error(result)
    }
  }
}
</script>
