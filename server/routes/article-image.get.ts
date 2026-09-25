const PLACEHOLDER = '/article-placeholder.svg'

const VARY = { 'netlify-vary': 'query=source|link' }

const FOUND_HEADERS = {
  'cache-control': 'public, max-age=86400, stale-while-revalidate=604800',
  'netlify-cdn-cache-control': 'public, durable, s-maxage=2592000, stale-while-revalidate=86400',
  ...VARY,
}

// article exists, but has no og:image - may get one later
const MISSING_HEADERS = {
  'cache-control': 'public, max-age=3600',
  'netlify-cdn-cache-control': 'public, durable, s-maxage=86400',
  ...VARY,
}

// article page could not be fetched - retry soon
const FAILED_HEADERS = {
  'cache-control': 'public, max-age=300',
  'netlify-cdn-cache-control': 'public, s-maxage=300',
  ...VARY,
}

// resolves og:image of an article and redirects to it
// meant to be used directly as `<img src>` to load thumbnails lazily
export default defineEventHandler(async (event) => {
  const { source, link } = getQuery(event)

  if (!isArticleSource(source) || typeof link !== 'string' || !link) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing or invalid `source` or `link` parameter',
    })
  }

  let image: string | null | undefined
  try {
    image = await getArticleImage(source, link)
  } catch {
    setResponseHeaders(event, FAILED_HEADERS)
    return sendRedirect(event, PLACEHOLDER, 302)
  }

  if (image === undefined) {
    // the list may be newer on CDN than in this instance, never cache the miss
    setResponseStatus(event, 404, 'Unknown article link')
    setResponseHeader(event, 'cache-control', 'no-store')
    return 'Unknown article link'
  }

  setResponseHeaders(event, image ? FOUND_HEADERS : MISSING_HEADERS)
  return sendRedirect(event, image ?? PLACEHOLDER, 302)
})
