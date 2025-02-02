import { fileURLToPath } from 'node:url'
import { setup, fetch } from '@nuxt/test-utils/e2e'
import { describe, expect, test } from 'vitest'

// Testing:
// https://alois-seckar.cz/nuxt-news
// https://alois-seckar.cz/java-news
// https://alois-seckar.cz/coda-digest

describe('Check if all three news lists scrapers work properly', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('..', import.meta.url)),
    server: true,
  })

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
