// parsed content of the Markdown article lists
// (Java News, Nuxt News and Coda Digest)
export type ArticleItem = {
  date: string
  title: string
  link: string
  dscr: string
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

// fetch request type
export type ArticleFetchRequest = {
  // url to fetch from (.md file on github)
  url: string
  // number of records returned (all if not set)
  count?: number
  // lazy loading offset
  offset?: number
}
