import type { NeonError } from 'nuxt-neon'

export default defineEventHandler(async (event) => {
  if (!await checkLogin(event)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Not allowed to delete runs',
    })
  }

  const query = getQuery(event)
  const id = query.id?.toString()

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing run ID',
    })
  }

  const { del } = useNeonServer()
  const result = await del({
    table: 'elrh_run_records',
    where: { column: 'id', operator: '=', value: id },
  })

  if (result === 'OK') {
    console.debug(`Record ${id} deleted`)
    return {
      status: 200,
      statusText: 'OK',
    }
  } else {
    console.error('Error deleting run record')
    console.error(formatNeonError(result as NeonError))
    throw createError({
      statusCode: 500,
      statusMessage: formatNeonError(result as NeonError),
    })
  }
})
