// parsed content of the Markdown article lists
// (Java News, Nuxt News and Coda Digest)
export type ArticleItem = {
  date: string
  title: string
  link: string
  dscr: string
  image?: string
}

// return type of scraping endpoints
// - https://alois-seckar.cz/nuxt-news
// - https://alois-seckar.cz/java-news
// - https://alois-seckar.cz/coda-digest
export type Last5Articles = {
  item1: ArticleItem
  item2: ArticleItem
  item3: ArticleItem
  item4: ArticleItem
  item5: ArticleItem
}

// allowed article lists
// (mapped to their .md files in `articleSources.ts`)
export type ArticleSource = 'nuxt' | 'java' | 'coda'

// fetch request type
export type ArticleFetchRequest = {
  // source to fetch from (allowed whitelist)
  source: ArticleSource
  // number of records returned (all if not set)
  count?: number
  // lazy loading offset
  offset?: number
}

// headers for route settings

export const ARTICLE_DIGEST_HEADERS = {
  'cache-control': 'public, max-age=300, stale-while-revalidate=3600',
  'netlify-cdn-cache-control': 'public, durable, s-maxage=3600, stale-while-revalidate=86400',
  'netlify-vary': 'query=source|count|offset',
}

export const LEGACY_DIGEST_HEADERS = {
  'cache-control': 'public, max-age=300, stale-while-revalidate=3600',
  'netlify-cdn-cache-control': 'public, durable, s-maxage=3600, stale-while-revalidate=86400',
}
