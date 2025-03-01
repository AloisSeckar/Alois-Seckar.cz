/**
 * Reads data from `elrh_run_tracks` table
 */
export async function getTracks() {
  const { select } = useNeon()
  return await select(
    ['id as tId', 'name as tName', 'length as tLength'],
    'elrh_run_tracks',
    undefined,
    'name',
  )
}

/**
 * Reads (filtered) data from `elrh_run_records` table
 */
export async function getRuns(filter?: RunFilter): Promise<RunRecord[]> {
  const { select } = useNeon()

  const columns = ['r.id as rId', 'r.date as rDate', 't.id as tId', 't.name as tName', 't.dscr as tDscr', 't.length as tLength', 't.map_link as tMapLink', 'r.dscr as rDscr', 'r.length as rLength', 'r.time as rTime', 'r.speed as rSpeed']

  const tables = [
    { table: 'elrh_run_records', alias: 'r' },
    { table: 'elrh_run_tracks', alias: 't', joinColumn1: 'r.track', joinColumn2: 't.id' },
  ]

  let sql = ''
  const where = [] as string[] // TODO transfer into NeonWhereQuery
  if (filter) {
    if (filter.track && filter.track > 0) {
      where.push(`t.id = ${filter.track}`)
    }

    if (filter.year && filter.year > 0) {
      // TODO split into 2 NeonWhereQuery
      where.push(getSQLForDatePeriod(filter.year, filter.month))
    }

    if (where.length > 0) {
      sql += where.join(' AND ')
    }

    log.debug('filtering runs using:')
    log.debug(sql)
  }

  // TODO better typing for "direction" in nuxt-neon
  type SortDirection = 'DESC' | 'ASC' | undefined
  const order = [
    { column: filter?.sortColumn === 'rspeed' ? 'r.speed' : 'r.date', direction: filter?.sortDirection as SortDirection ?? 'DESC' as SortDirection },
    { column: 'r.id', direction: 'DESC' as SortDirection },
  ]

  return await select(columns, tables, sql, order)
}

function getSQLForDatePeriod(year: number, month?: number): string {
  const lastDay = new Date(year, month || 12, 0).getDate()
  const monthStr = String(month).padStart(2, '0')
  const fromDate = `${year}-${month ? monthStr : '01'}-01`
  const toDate = `${year}-${month ? monthStr : '12'}-${lastDay}`
  return `r.date BETWEEN '${fromDate}' AND '${toDate}'`
}
