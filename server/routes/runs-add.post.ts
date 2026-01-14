import type { NeonError } from 'nuxt-neon'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const config = useRuntimeConfig()
  if (!session.user?.githubId || session.user.githubId !== config.public.key) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Not allowed to insert new runs',
    })
  }

  const body = await readFormData(event)

  const inputLength = body.get('inputLength')?.toString() || '0'
  const inputTime = body.get('inputTime')?.toString() || ''

  const run = {
    date: body.get('inputDate')?.toString() || '',
    track: body.get('inputTrack')?.toString() || '',
    dscr: body.get('inputDscr')?.toString() || '',
    length: inputLength,
    time: inputTime,
    speed: getAVGSpeed(inputTime, parseInt(inputLength)).toString(),
  }

  const { insert } = useNeonServer()
  const result = await insert({
    table: 'elrh_run_records',
    values: run,
  })

  if (result === 'OK') {
    return {
      status: 200,
      statusText: 'OK',
    }
  } else {
    console.error('Error inserting run record')
    console.error(formatNeonError(result as NeonError))
    throw createError({
      statusCode: 500,
      statusMessage: formatNeonError(result as NeonError),
    })
  }
})
