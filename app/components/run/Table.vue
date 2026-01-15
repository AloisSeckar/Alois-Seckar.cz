<template>
  <div>
    <div>Celkem: {{ runs.length }} ({{ totalLenth }} km)</div>
    <UPagination
      :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
      :items-per-page="table?.tableApi?.getState().pagination.pageSize"
      :total="table?.tableApi?.getFilteredRowModel().rows.length"
      :sibling-count="1" class="flex flex-row justify-center mt-2"
      @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    <UTable
      ref="table"
      v-model:sort="sort" v-model:pagination="pagination"
      :data="runs" :columns
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }">
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
        <div v-if="allowDelete" class="cursor-pointer" title="Smazat" @click="deleteRun(row.original.rid)">
          X
        </div>
      </template>
    </UTable>
    <div>Celkem: {{ runs.length }} ({{ totalLenth }} km)</div>
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel, type SortDirection } from '@tanstack/vue-table'

const { loggedIn } = useUserSession()
const allowDelete = ref(false)
watchEffect(async () => {
  allowDelete.value = loggedIn.value && await $fetch<boolean>('/auth/login')
})

const table = useTemplateRef('table')

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

const emits = defineEmits<{
  filter: [tid: number]
  sort: [column: string, direction: SortDirection]
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

// UTable sorting
const sort = ref({
  column: 'rdate',
  direction: 'desc' as SortDirection,
})
watch(sort, () => emits('sort', sort.value.column, sort.value.direction), { deep: true })

// UTable pagination model
const pagination = ref({
  pageIndex: 0,
  pageSize: 30,
})

// for regular tracks display their name with link+dscr
// for "-1" track there is no link...
function getTrackInfo(row: RunTableRow) {
  const dscr = row.original.rdscr || row.original.tdscr
  if (row.original.tid > 0) {
    return `<a href="${row.original.tmaplink}" title="${dscr}">${row.original.tname}</a>`
  } else {
    return `<span title="${dscr}">Jednorázové</span>`
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
    try {
      await $fetch(`/run-delete?id=${id}`, { method: 'DELETE' })
      log.debug(`Record ${id} deleted`)
      alert('Smazáno')
      emits('delete')
    } catch (error) {
      log.error(error)
      alert('Chyba při mazání')
    }
  }
}
</script>
