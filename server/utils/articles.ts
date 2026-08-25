import { parse } from 'node-html-parser'

// the source .md files change at most once a day
const LINES_MAX_AGE = 60 * 60 // 1 hour
const LINES_STALE_MAX_AGE = 60 * 60 * 24 // serve stale for a day while revalidating

// og:image of an already published article practically never changes
const IMAGE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function getArticles(request: ArticleFetchRequest): Promise<ArticleItem[]> {
  const mdLines = await fetchArticleLines(request.source)
  // return requested amount
  const start = request.offset ?? 0
  const end = request.count ? start + request.count : undefined
  return Promise.all(mdLines.slice(start, end).map(md => parseMarkdown(md)))
}

export async function getLast5Articles(source: ArticleSource): Promise<Last5Articles> {
  const items = await getArticles({ source, count: 5 })
  const empty = await parseMarkdown('')
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
  return markdown.split('\n').filter(l => l.startsWith('| **`'))
}, {
  name: 'article-lines',
  group: 'articles',
  maxAge: LINES_MAX_AGE,
  staleMaxAge: LINES_STALE_MAX_AGE,
  swr: true,
  getKey: (source: ArticleSource) => source,
})

async function parseMarkdown(entry: string): Promise<ArticleItem> {
  const article: ArticleItem = {
    date: entry.substring(entry.indexOf('*`') + 2, entry.indexOf('`*')),
    title: entry.substring(entry.indexOf('| [') + 3, entry.indexOf('](')),
    link: entry.substring(entry.indexOf('](') + 2, entry.indexOf(') - ')),
    dscr: stripMarkdown(entry.substring(entry.indexOf(') - ') + 4, entry.lastIndexOf(' |'))),
  }

  if (article.link) {
    article.image = await fetchImage(article.link) ?? undefined
  }

  return article
}

function stripMarkdown(entry: string): string {
  return entry.replaceAll('**', '').replaceAll('_', '')
}

// try to extract og:image meta tag
// must return `null` instead of `undefined` on a miss, Nitro refuses to cache `undefined`
const fetchImage = defineCachedFunction(async (link: string): Promise<string | null> => {
  try {
    const htmlData = await $fetch<string>(link)
    const htmlPage = parse(htmlData)
    const ogImage = htmlPage.querySelector('meta[property="og:image"]')
    return ogImage?.getAttribute('content') ?? null
  } catch {
    // placeholder image will be used
    return null
  }
}, {
  name: 'og-image',
  group: 'articles',
  maxAge: IMAGE_MAX_AGE,
  swr: true,
  getKey: (link: string) => Buffer.from(link).toString('base64url'),
})
