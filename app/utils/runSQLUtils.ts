import type { NeonError, NeonOrderObject, NeonWhereObject } from 'nuxt-neon'

/**
 * Reads data from `elrh_run_tracks` table
 */
export async function getTracks(): Promise<TrackInfo[]> {
  const { select } = useNeonClient()
  const ret = await select<TrackInfo>({
    // TODO remove workaround once https://github.com/AloisSeckar/nuxt-neon/issues/76 fixed and new module version added into Nuxt Ignis
    // columns: ['id as tId', 'name as tName', 'length as tLength'],
    columns: ['id', 'name', 'length'],
    from: 'elrh_run_tracks',
    order: { column: 'name' },
  })
  if (isNeonSuccess(ret)) {
    // TODO remove workaround once https://github.com/AloisSeckar/nuxt-neon/issues/76 fixed and new module version added into Nuxt Ignis
    const tracks = [] as TrackInfo[]
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (ret as Record<string, any>[]).forEach((el) => {
      tracks.push({
        tid: el['id'],
        tname: el['name'],
        tlength: el['length'],
      })
    })
    return tracks
  } else {
    log.error('Error fetching tracks')
    log.error(formatNeonError(ret as NeonError))
    return []
  }
}

/**
 * Reads (filtered) data from `elrh_run_records` table
 */
export async function getRuns(filter?: RunFilter): Promise<RunRecord[]> {
  const { select } = useNeonClient()

  // TODO remove workaround once https://github.com/AloisSeckar/nuxt-neon/issues/76 fixed and new module version added into Nuxt Ignis
  // const columns = ['r.id as rId', 'r.date as rDate', 't.id as tId', 't.name as tName', 't.dscr as tDscr', 't.length as tLength', 't.map_link as tMapLink', 'r.dscr as rDscr', 'r.length as rLength', 'r.time as rTime', 'r.speed as rSpeed']
  const columns = ['r.id', 'r.date', 't.id', 't.name', 't.dscr', 't.length', 't.map_link', 'r.dscr', 'r.length', 'r.time', 'r.speed']

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

  const ret = await select({ columns, from, where, order })
  if (isNeonSuccess(ret)) {
    // TODO remove workaround once https://github.com/AloisSeckar/nuxt-neon/issues/76 fixed and new module version added into Nuxt Ignis
    const records = [] as RunRecord[]
    let rid = 0;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (ret as Record<string, any>[]).forEach((el) => {
      records.push({
        rid: rid++,
        rdate: el['date'],
        tid: el['id'],
        tname: el['name'],
        tdscr: el['dscr'],
        tlength: el['length'],
        tmaplink: el['map_link'],
        rdscr: el['dscr'],
        rlength: el['length'],
        rtime: el['time'],
        rspeed: el['speed'],
      })
    })
    return records
  } else {
    log.error('Error fetching records')
    log.error(formatNeonError(ret as NeonError))
    return []
  }
}
