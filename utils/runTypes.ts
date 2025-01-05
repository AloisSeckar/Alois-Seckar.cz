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
}

/** Wrapper to allow typing in UTable component slots */
export type RunTableData = {
  row: RunRecord
}

/** Helper object for calculating historical best/average distances by years/months */
export type RunStats = {
  [k: string]: number
}

/** Object for filtering records */
export type RunFilter = {
  track?: number
  month?: number
  year?: number
}

/** Type for Nuxt UI USelect options */
export type SelectValue = {
  label: string
  value: number
}
