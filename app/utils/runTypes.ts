import type { Row } from '@tanstack/table-core'

/** Info about single run based on the database tables */
export type RunRecord = {
  rid: number
  rdate: string
  tid: number
  tname: string
  tdscr: string
  tlength: number
  tmaplink: string
  rdscr: string
  rlength: number
  rtime: string
  rspeed: string
  admin?: unknown // artificial record to allow admin-action column in run table
}

/** Wrapper to allow typing in UTable component slots */
export type RunTableData = {
  row: Row<RunRecord>
}

/** Wrapper to avoid importing Row from @tanstack elsewhere */
export type RunTableRow = Row<RunRecord>

/** Helper object for calculating historical best/average distances by years/months */
export type RunStats = {
  [k: string]: number
}

/** Object for filtering records */
export type RunFilter = {
  track?: number
  month?: number
  year?: number
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
}

/** Type for Nuxt UI USelect options */
export type TrackInfo = {
  tid: number
  tname: string
  tlength: number
}

/** Type for Vueform Select options */
export type SelectValue = {
  label: string
  value: string
}
