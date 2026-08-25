import type { ArticleSource } from './articleTypes'

// allowed markdown sources
// do not just fetch any arbitrary client-supplied URL
export const ARTICLE_SOURCES: Record<ArticleSource, string> = {
  nuxt: 'https://raw.githubusercontent.com/AloisSeckar/demos-nuxt/refs/heads/main/NuxtNews.md',
  java: 'https://raw.githubusercontent.com/AloisSeckar/demos-java/refs/heads/master/JavaNews.md',
  coda: 'https://raw.githubusercontent.com/AloisSeckar/master-coda/refs/heads/master/CodaDigest.md',
}

export function isArticleSource(value: unknown): value is ArticleSource {
  return typeof value === 'string' && value in ARTICLE_SOURCES
}
