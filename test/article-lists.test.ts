import { fileURLToPath } from 'node:url'
import { setup, fetch } from '@nuxt/test-utils/e2e'
import { describe, expect, test } from 'vitest'
import type { ArticleItem, Last5Articles } from '../shared/utils/articleTypes'

describe('Check if endpoints for scraping news articles work properly', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('..', import.meta.url)),
    server: true,
  })

  // 2026
  // https://alois-seckar.cz/get-articles

  test('should return requested amount of entries', async () => {
    const response = await fetch('/get-articles?source=nuxt&count=2&offset=0')
    expect(response.status).toBe(200)
    const jsonData = await response.json() as ArticleItem[]
    expect(jsonData).toHaveLength(2)
    expect(jsonData[0]).toHaveProperty('date')
    expect(jsonData[0]).toHaveProperty('title')
    expect(jsonData[0]).toHaveProperty('link')
    expect(jsonData[0]).toHaveProperty('dscr')
    expect(jsonData[0]).not.toHaveProperty('image')
  })

  test('should refuse to fetch an unknown source', async () => {
    const response = await fetch('/get-articles?source=https://example.com/evil.md')
    expect(response.status).toBe(400)
  })

  // https://alois-seckar.cz/article-image

  test('should redirect to article image', async () => {
    const articles = await (await fetch('/get-articles?source=nuxt&count=1')).json() as ArticleItem[]
    const query = new URLSearchParams({ source: 'nuxt', link: articles[0]!.link })
    const response = await fetch(`/article-image?${query}`, { redirect: 'manual' })
    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBeTruthy()
  })

  test('should refuse to fetch image for an unknown source', async () => {
    const response = await fetch('/article-image?source=evil&link=https://example.com', { redirect: 'manual' })
    expect(response.status).toBe(400)
  })

  test('should refuse to fetch image for a link outside of the source', async () => {
    const response = await fetch('/article-image?source=nuxt&link=https://example.com', { redirect: 'manual' })
    expect(response.status).toBe(404)
  })

  // legacy
  // https://alois-seckar.cz/nuxt-news
  // https://alois-seckar.cz/java-news
  // https://alois-seckar.cz/coda-digest

  test('should return last 5 Nuxt News entries', async () => {
    const response = await fetch('/nuxt-news')
    expect(response.status).toBe(200)
    const jsonData = await response.json() as Last5Articles
    validate(jsonData)
  })

  test('should return last 5 Java News entries', async () => {
    const response = await fetch('/java-news')
    expect(response.status).toBe(200)
    const jsonData = await response.json() as Last5Articles
    validate(jsonData)
  })

  test('should return last 5 Coda Digest entries', async () => {
    const response = await fetch('/coda-digest')
    expect(response.status).toBe(200)
    const jsonData = await response.json() as Last5Articles
    validate(jsonData)
  })
})

function validate(jsonData: Last5Articles) {
  expect(jsonData).toHaveProperty('item1')
  expect(jsonData).toHaveProperty('item2')
  expect(jsonData).toHaveProperty('item3')
  expect(jsonData).toHaveProperty('item4')
  expect(jsonData).toHaveProperty('item5')
  expect(jsonData).not.toHaveProperty('item6')
  const { item1 } = jsonData
  expect(item1).toHaveProperty('date')
  expect(item1).toHaveProperty('title')
  expect(item1).toHaveProperty('link')
  expect(item1).toHaveProperty('dscr')
}
