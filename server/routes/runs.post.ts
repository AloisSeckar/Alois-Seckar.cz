import type { NeonError, NeonOrderObject, NeonWhereObject } from 'nuxt-neon'

export default defineEventHandler(async (event) => {
  const filter = await readBody<RunFilter | undefined>(event).catch(() => undefined) as RunFilter | undefined
  const { select } = useNeonServer()

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

    console.debug('filtering runs using:', where)
  }

  const order: NeonOrderObject[] = [
    { column: filter?.sortColumn === 'rspeed' ? 'r.speed' : 'r.date', direction: filter?.sortDirection || 'DESC' },
    { column: 'r.id', direction: 'DESC' },
  ]

  const runs = await select({ columns, from, where, order })
  if (isNeonSuccess(runs)) {
    return runs as RunRecord[]
  } else {
    console.error('Error fetching records')
    console.error(formatNeonError(runs as NeonError))
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch run records',
    })
  }
})
