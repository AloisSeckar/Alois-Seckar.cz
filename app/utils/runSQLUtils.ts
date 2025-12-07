import type { NeonOrderObject } from '#build/types/neon'

/**
 * Reads data from `elrh_run_tracks` table
 */
export async function getTracks(): Promise<TrackInfo[]> {
  const { select } = useNeon()
  return await select<TrackInfo>({
    columns: ['id as tId', 'name as tName', 'length as tLength'],
    from: 'elrh_run_tracks',
    order: { column: 'name' },
  })
}

/**
 * Reads (filtered) data from `elrh_run_records` table
 */
export async function getRuns(filter?: RunFilter): Promise<RunRecord[]> {
  const { select } = useNeon()

  const columns = ['r.id as rId', 'r.date as rDate', 't.id as tId', 't.name as tName', 't.dscr as tDscr', 't.length as tLength', 't.map_link as tMapLink', 'r.dscr as rDscr', 'r.length as rLength', 'r.time as rTime', 'r.speed as rSpeed']

  const from = [
    { table: 'elrh_run_records', alias: 'r' },
    { table: 'elrh_run_tracks', alias: 't', joinColumn1: 'r.track', joinColumn2: 't.id' },
  ]

  // TODO transfer into NeonWhereQuery after issue with ">" and "<" is fixed
  // (issue opened https://github.com/AloisSeckar/nuxt-neon/issues/45)
  const where = [] as string[]
  if (filter) {
    if (filter.track && filter.track > 0) {
      // where.push({ column: 't.id', condition: '=', value: filter.track.toString() })
      where.push(`t.id = ${filter.track}`)
    }

    if (filter.year && filter.year > 0) {
      // TODO replace with "BETWEEN" once when supported by nuxt-neon
      // (issue opened https://github.com/AloisSeckar/nuxt-neon/issues/43)
      where.push(getSQLForDatePeriod(filter.year, filter.month))
    }

    log.debug('filtering runs using:')
    log.debug.raw(where)
  }

  const order: NeonOrderObject[] = [
    { column: filter?.sortColumn === 'rspeed' ? 'r.speed' : 'r.date', direction: filter?.sortDirection || 'DESC' },
    { column: 'r.id', direction: 'DESC' },
  ]

  // TODO nuxt-neon should detect empty "where" object itself
  // (issue opened https://github.com/AloisSeckar/nuxt-neon/issues/44)
  return await select({ columns, from, where: where.length > 0 ? where.join(' AND ') : undefined, order })
}

function getSQLForDatePeriod(year: number, month?: number): string {
  const lastDay = new Date(year, month || 12, 0).getDate()
  const monthStr = String(month).padStart(2, '0')
  const fromDate = `${year}-${month ? monthStr : '01'}-01`
  const toDate = `${year}-${month ? monthStr : '12'}-${lastDay}`
  return `r.date BETWEEN '${fromDate}' AND '${toDate}'`
}
