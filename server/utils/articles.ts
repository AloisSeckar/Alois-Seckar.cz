import { parse } from 'node-html-parser'

export async function getArticles(url: string, count: number): Promise<ArticleItem[]> {
  const htmlData = await $fetch<string>(url)
  const htmlPage = parse(htmlData)
  const markdown = htmlPage.innerText
  const mdLines = markdown.split('\n').filter(l => l.startsWith('| **`'))
  return mdLines.slice(0, count).map(md => parseMarkdown(md))
}

export async function getLast5Articles(url: string): Promise<Last5Articles> {
  const items = await getArticles(url, 5)
  return {
    item1: items[0] || parseMarkdown(''),
    item2: items[1] || parseMarkdown(''),
    item3: items[2] || parseMarkdown(''),
    item4: items[3] || parseMarkdown(''),
    item5: items[4] || parseMarkdown(''),
  }
}

function parseMarkdown(entry: string): ArticleItem {
  return {
    date: entry.substring(entry.indexOf('*`') + 2, entry.indexOf('`*')),
    title: entry.substring(entry.indexOf('| [') + 3, entry.indexOf('](')),
    link: entry.substring(entry.indexOf('](') + 2, entry.indexOf(') - ')),
    dscr: stripMarkdown(entry.substring(entry.indexOf(') - ') + 4, entry.lastIndexOf(' |'))),
  }
}

function stripMarkdown(entry: string): string {
  return entry.replaceAll('**', '').replaceAll('_', '')
}
