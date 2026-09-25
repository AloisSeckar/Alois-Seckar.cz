import { parse } from 'node-html-parser'

// the source .md files change at most once a day
const LINES_MAX_AGE = 60 * 60 // 1 hour
const LINES_STALE_MAX_AGE = 60 * 60 * 24 // serve stale for a day while revalidating

// og:image of an already published article practically never changes
const IMAGE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const IMAGE_FETCH_TIMEOUT = 5000

export async function getArticles(request: ArticleFetchRequest): Promise<ArticleItem[]> {
  const mdLines = await fetchArticleLines(request.source)
  // return requested amount
  const start = request.offset ?? 0
  const end = request.count ? start + request.count : undefined
  return mdLines.slice(start, end).map(md => parseMarkdown(md))
}

export async function getLast5Articles(source: ArticleSource): Promise<Last5Articles> {
  const items = await getArticles({ source, count: 5 })
  const empty = parseMarkdown('')
  return {
    item1: items[0] || empty,
    item2: items[1] || empty,
    item3: items[2] || empty,
    item4: items[3] || empty,
    item5: items[4] || empty,
  }
}

const fetchArticleLines = defineCachedFunction(async (source: ArticleSource): Promise<string[]> => {
  const htmlData = await $fetch<string>(ARTICLE_SOURCES[source])
  const htmlPage = parse(htmlData)
  const markdown = htmlPage.innerText
  return markdown.split('\n').filter(l => l.startsWith('| **`') && !/\| \*\*JDK \d+ release date\*\* \|/.test(l))
}, {
  name: 'article-lines',
  group: 'articles',
  maxAge: LINES_MAX_AGE,
  staleMaxAge: LINES_STALE_MAX_AGE,
  swr: true,
  getKey: (source: ArticleSource) => source,
})

function parseMarkdown(entry: string): ArticleItem {
  return {
    date: entry.substring(entry.indexOf('*`') + 2, entry.indexOf('`*')),
    title: entry.substring(entry.indexOf('| [') + 3, entry.indexOf('](')),
    link: parseLink(entry),
    dscr: stripMarkdown(entry.substring(entry.indexOf(') - ') + 4, entry.lastIndexOf(' |'))),
  }
}

function parseLink(entry: string): string {
  return entry.substring(entry.indexOf('](') + 2, entry.indexOf(') - '))
}

function stripMarkdown(entry: string): string {
  return entry.replaceAll('**', '').replaceAll('_', '')
}

// `undefined` = link is not part of the source (do not fetch arbitrary client-supplied URLs)
// `null` = article has no usable og:image
// throws when the article page cannot be fetched
export async function getArticleImage(source: ArticleSource, link: string): Promise<string | null | undefined> {
  const mdLines = await fetchArticleLines(source)
  if (!mdLines.some(l => parseLink(l) === link)) {
    return undefined
  }
  return fetchImage(link)
}

// must return `null` instead of `undefined` on a miss, Nitro refuses to cache `undefined`
// errors are rethrown on purpose, so transient failures are not cached
const fetchImage = defineCachedFunction(async (link: string): Promise<string | null> => {
  const htmlData = await $fetch<string>(link, { timeout: IMAGE_FETCH_TIMEOUT, responseType: 'text' })
  const htmlPage = parse(htmlData)
  const content = htmlPage.querySelector('meta[property="og:image"]')?.getAttribute('content')
  if (!content) {
    return null
  }
  try {
    // og:image may be relative to the article URL
    const url = new URL(content, link)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}, {
  name: 'og-image',
  group: 'articles',
  maxAge: IMAGE_MAX_AGE,
  swr: true,
  getKey: (link: string) => Buffer.from(link).toString('base64url'),
})
