import type { ArticleSource } from './articleTypes'

// allowed markdown sources
// do not just fetch any arbitrary client-supplied URL
export const ARTICLE_SOURCES: Record<ArticleSource, string> = {
  nuxt: 'https://raw.githubusercontent.com/AloisSeckar/it-news/refs/heads/main/nuxt/NuxtNews.md',
  java: 'https://raw.githubusercontent.com/AloisSeckar/it-news/refs/heads/main/java/JavaNews.md',
  ai: 'https://raw.githubusercontent.com/AloisSeckar/it-news/refs/heads/main/ai/AINews.md',
  it: 'https://raw.githubusercontent.com/AloisSeckar/it-news/refs/heads/main/it/ITDigest.md',
}

export function isArticleSource(value: unknown): value is ArticleSource {
  return typeof value === 'string' && value in ARTICLE_SOURCES
}
