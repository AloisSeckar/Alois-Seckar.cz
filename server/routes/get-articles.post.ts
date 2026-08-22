// new universal article-fetching endpoint
export default defineEventHandler(async (event): Promise<ArticleItem[]> => {
  const request = await readBody(event) as ArticleFetchRequest

  if (!request.url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing `url` parameter in request body',
    })
  }

  return await getArticles(request)
})
