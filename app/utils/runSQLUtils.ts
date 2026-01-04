import type { NeonError, NeonOrderObject, NeonWhereObject } from 'nuxt-neon'

/**
 * Reads data from `elrh_run_tracks` table
 */
export async function getTracks(): Promise<TrackInfo[]> {
  const { select } = useNeonClient()
  const tracks = await select<TrackInfo>({
    columns: ['id as tid', 'name as tname', 'length as tlength'],
    from: 'elrh_run_tracks',
    order: { column: 'name' },
  })
  if (isNeonSuccess(tracks)) {
    return tracks as TrackInfo[]
  } else {
    log.error('Error fetching tracks')
    log.error(formatNeonError(tracks as NeonError))
    return []
  }
}

/**
 * Reads (filtered) data from `elrh_run_records` table
 */
export async function getRuns(filter?: RunFilter): Promise<RunRecord[]> {
  const { select } = useNeonClient()

  const columns = ['r.id as rid', 'r.date as rdate', 't.id as tid', 't.name as tname', 't.dscr as tdscr', 't.length as tlength', 't.map_link as tmaplink', 'r.dscr as rdscr', 'r.length as rlength', 'r.time as rtime', 'r.speed as rspeed']

  const from = [
    { table: 'elrh_run_records', alias: 'r' },
    { table: 'elrh_run_tracks', alias: 't', joinColumn1: 'r.track', joinColumn2: 't.id' },
  ]

  const where = [] as NeonWhereObject[]
  if (filter) {
    if (filter.track && filter.track > 0) {
      where.push({ column: 't.id', operator: '=', value: filter.track.toString() })
    }

    if (filter.year && filter.year > 0) {
      const lastDay = new Date(filter.year, filter.month || 12, 0).getDate()
      const monthStr = String(filter.month).padStart(2, '0')
      const fromDate = `${filter.year}-${filter.month ? monthStr : '01'}-01`
      const toDate = `${filter.year}-${filter.month ? monthStr : '12'}-${lastDay}`
      where.push({ column: 'r.date', operator: 'BETWEEN', value: `'${fromDate}','${toDate}'`, relation: where.length > 0 ? 'AND' : undefined })
    }

    log.debug('filtering runs using:')
    log.debug.raw(where)
  }

  const order: NeonOrderObject[] = [
    { column: filter?.sortColumn === 'rspeed' ? 'r.speed' : 'r.date', direction: filter?.sortDirection || 'DESC' },
    { column: 'r.id', direction: 'DESC' },
  ]

  const runs = await select({ columns, from, where, order })
  if (isNeonSuccess(runs)) {
    return runs as RunRecord[]
  } else {
    log.error('Error fetching records')
    log.error(formatNeonError(runs as NeonError))
    return []
  }
}
