<template>
  <div>
    <div>Celkem: {{ runs.length }} ({{ totalLenth }} km)</div>
    <UPagination v-model="page" :page-count="30" :total="runs.length || 0" class="flex flex-row justify-center mt-2" />
    <UTable v-model:sort="sort" :data="rows" :columns>
      <template #tname-cell="{ row }: RunTableData">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="inline" v-html="getTrackInfo(row)" />
        <div
          v-if="row.original.tid > 0"
          class="inline cursor-pointer hover:text-amber-300"
          title="Filtrovat" @click="filterTrack(row.original.tid)">
          &#9660;
        </div>
      </template>
      <template #admin-cell="{ row }: RunTableData">
        <div v-if="useLoginStore().login" class="cursor-pointer" title="Smazat" @click="deleteRun(row.original.rid)">
          X
        </div>
      </template>
    </UTable>
    <UPagination v-model="page" :items-per-page="30" :total="runs.length || 0" class="flex flex-row justify-center mb-2" />
    <div>Celkem: {{ runs.length }} ({{ totalLenth }} km)</div>
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UButton = resolveComponent('UButton')

const { runs } = defineProps({
  runs: { type: Object as PropType<RunRecord[]>, required: true },
})

const totalLenth = computed(() => {
  let total = 0
  runs.forEach((r: RunRecord) => {
    total += (r.tid > 0 ? r.tlength : r.rlength)
  })
  return (total / 1000).toFixed(1)
})
watch(totalLenth, () => {
  page.value = 1
})

const emits = defineEmits<{
  filter: [tid: number]
  sort: [column: string, direction: 'asc' | 'desc']
  delete: []
}>()

// customize UTable
const columns: TableColumn<RunRecord>[] = [{
  accessorKey: 'rdate',
  header: ({ column }) => {
    const isSorted = column.getIsSorted()
    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label: 'Datum',
      icon: isSorted
        ? isSorted === 'asc'
          ? 'i-lucide-arrow-up-narrow-wide'
          : 'i-lucide-arrow-down-wide-narrow'
        : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
    })
  },
  cell: ({ row }: RunTableData) => useDateFormat(row.getValue<string>('rdate'), 'DD.MM.YYYY').value,
}, {
  accessorKey: 'tname',
  header: 'Trasa',
}, {
  accessorKey: 'rlength',
  header: 'Vzdálenost',
  cell: ({ row }: RunTableData) => `${getLengthInfo(row)} m`,
}, {
  accessorKey: 'rtime',
  header: 'Čas',
  cell: ({ row }: RunTableData) => parseTimeInfo(row.original.rtime),
}, {
  accessorKey: 'rspeed',
  header: ({ column }) => {
    const isSorted = column.getIsSorted()
    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label: '⌀ rychlost',
      icon: isSorted
        ? isSorted === 'asc'
          ? 'i-lucide-arrow-up-narrow-wide'
          : 'i-lucide-arrow-down-wide-narrow'
        : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
    })
  },
  cell: ({ row }: RunTableData) => `${row.original.rspeed} km/h`,
}, {
  accessorKey: 'admin',
  header: '',
}]

// TODO only sorts current page now...
const sort = ref({
  column: 'rdate',
  direction: 'desc' as 'asc' | 'desc',
})
watch(sort, () => emits('sort', sort.value.column, sort.value.direction), { deep: true })

// UTable pagination
const page = ref(1)
const rows = computed(() => {
  return runs.slice((page.value - 1) * 30, (page.value) * 30)
})

// for regular tracks display their name with link+dscr
// for "-1" track there is no link...
function getTrackInfo(row: RunTableRow) {
  const dscr = row.original.rdscr || row.original.tdscr
  if (row.original.tid > 0) {
    return `<a href="${row.original.tmaplink}" title="${dscr}">${row.original.tname}</a>`
  } else {
    return `<span title="${dscr}">Jednorázové</a>`
  }
}

// for regular tracks the length is stored in elrh_run_tracks
// for "-1" track the length is directly in elrh_run_records
function getLengthInfo(row: RunTableRow) {
  if (row.original.tid > 0) {
    return row.original.tlength
  } else {
    return row.original.rlength
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
    const result = await del({
      table: 'elrh_run_records',
      where: { column: 'id', condition: '=', value: id },
    })

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
