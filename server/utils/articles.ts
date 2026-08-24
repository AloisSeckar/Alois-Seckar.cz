import { parse } from 'node-html-parser'

export async function getArticles(request: ArticleFetchRequest): Promise<ArticleItem[]> {
  const htmlData = await $fetch<string>(request.url)
  const htmlPage = parse(htmlData)
  const markdown = htmlPage.innerText
  const mdLines = markdown.split('\n').filter(l => l.startsWith('| **`'))
  return Promise.all(mdLines.slice(request.offset, request.count).map(md => parseMarkdown(md)))
}

export async function getLast5Articles(url: string): Promise<Last5Articles> {
  const items = await getArticles({ url, count: 5 })
  const empty = await parseMarkdown('')
  return {
    item1: items[0] || empty,
    item2: items[1] || empty,
    item3: items[2] || empty,
    item4: items[3] || empty,
    item5: items[4] || empty,
  }
}

async function parseMarkdown(entry: string): Promise<ArticleItem> {
  const article = {
    date: entry.substring(entry.indexOf('*`') + 2, entry.indexOf('`*')),
    title: entry.substring(entry.indexOf('| [') + 3, entry.indexOf('](')),
    link: entry.substring(entry.indexOf('](') + 2, entry.indexOf(') - ')),
    dscr: stripMarkdown(entry.substring(entry.indexOf(') - ') + 4, entry.lastIndexOf(' |'))),
  }

  await fetchImage(article)

  return article
}

function stripMarkdown(entry: string): string {
  return entry.replaceAll('**', '').replaceAll('_', '')
}

// try to extract og:image meta tag
async function fetchImage(article: ArticleItem): Promise<void> {
  if (!article.link) return
  try {
    const htmlData = await $fetch<string>(article.link)
    const htmlPage = parse(htmlData)
    const ogImage = htmlPage.querySelector('meta[property="og:image"]')
    article.image = ogImage?.getAttribute('content') ?? undefined
  } catch {
    // placeholder image will be used
  }
}
