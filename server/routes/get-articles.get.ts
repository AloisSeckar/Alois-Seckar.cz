const MAX_COUNT = 50

// universal article-fetching endpoint
// using GET for CDN and browser caching
export default defineCachedEventHandler(async (event): Promise<ArticleItem[]> => {
  const query = getQuery(event)

  if (!isArticleSource(query.source)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing or unknown `source` parameter',
    })
  }

  return await getArticles({
    source: query.source,
    count: clamp(query.count, 1, MAX_COUNT),
    offset: clamp(query.offset, 0, Number.MAX_SAFE_INTEGER),
  })
}, {
  name: 'get-articles',
  group: 'routes',
  maxAge: 60 * 60,
  staleMaxAge: 60 * 60 * 24,
  swr: true,
})

// keeps the amount of distinct cache keys bounded
function clamp(value: unknown, min: number, max: number): number | undefined {
  const num = Number(value)
  if (!Number.isFinite(num)) {
    return undefined
  }
  return Math.min(Math.max(Math.floor(num), min), max)
}
