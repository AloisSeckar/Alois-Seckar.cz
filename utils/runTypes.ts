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
