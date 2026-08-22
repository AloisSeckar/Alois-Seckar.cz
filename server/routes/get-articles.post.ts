// new universal article-fetching endpoint
export default defineEventHandler(async (event): Promise<ArticleItem[]> => {
  const body = await readBody(event)

  const url = body.url as string
  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing `url` parameter in request body',
    })
  }

  const count = body.count as number
  if (!count) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing `count` parameter in request body',
    })
  }

  return await getArticles(url, count)
})
