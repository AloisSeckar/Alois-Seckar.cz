import { fileURLToPath } from 'node:url'
import { setup, $fetch, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, expect, test } from 'vitest'

describe('Check if homepage renders correctly', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('..', import.meta.url)),
  })

  test('"index" page renders correctly', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>Alois Sečkár</h1>') // title appears
    expect(html).toContain('<h2>Programátor</h2>') // section appears
    expect(html).toContain('src="/ignis.webp"') // image appears
    expect(html).toContain('/pdf/as-rust.pdf') // link appears
    expect(html).toContain('<h2>Sportovec</h2>') // section appears
    expect(html).toContain('src="/wbsc.webp"') // image appears
    expect(html).toContain('<h2>Krčský patriot</h2>') // section appears
    expect(html).toContain('src="/krc.webp"') // image appears
    expect(html).toContain('<h2>Ostatní</h2>') // section appears
    expect(html).toContain('href="https://www.deviantart.com/ellrohir"') // link appears
    expect(html).toContain('src="/instagram.webp"') // image appears
  })

  test('"ramecky" page renders correctly', async () => {
    const html = await $fetch('/ramecky')
    expect(html).toContain('Svobodné rámečky') // title appears
    expect(html).toContain('http://ellrohir.mzf.cz/ramecky/') // redirect link appears
  })

  test('"run" page renders correctly', async () => {
    // playwright used here to wait for page hydration
    const page = await createPage()
    await page.goto(url('/run'), { waitUntil: 'hydration' })
    await page.waitForSelector('table tr:has-text("km/h")', { timeout: 5000 })
    const html = await page.textContent('body')
    expect(html).toContain('Běžecké statistiky') // title appears
    expect(html).toContain('Trasa:') // filter form appears
    expect(html).toContain('Celkem:') // total sum appears
    expect(html).toContain('km/h') // at least one record appears
  })
})
