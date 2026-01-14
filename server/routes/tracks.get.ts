import type { NeonError } from 'nuxt-neon'

export default defineEventHandler(async () => {
  const { select } = useNeonServer()
  const tracks = await select<TrackInfo>({
    columns: ['id as tid', 'name as tname', 'length as tlength'],
    from: 'elrh_run_tracks',
    order: { column: 'name' },
  })
  if (isNeonSuccess(tracks)) {
    return tracks as TrackInfo[]
  } else {
    console.error('Error fetching tracks')
    console.error(formatNeonError(tracks as NeonError))
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch tracks',
    })
  }
})
