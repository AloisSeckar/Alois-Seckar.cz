import { parse } from 'node-html-parser'

export type ArticleItem = {
  date: string
  title: string
  link: string
  dscr: string
}

export type Last5Articles = {
  item1: ArticleItem
  item2: ArticleItem
  item3: ArticleItem
  item4: ArticleItem
  item5: ArticleItem
}

export async function getLast5Articles(url: string): Promise<Last5Articles> {
  const htmlData = await $fetch<string>(url)
  const htmlPage = parse(htmlData)
  const markdown = htmlPage.innerText
  const mdLines = markdown.split('\n').filter(l => l.startsWith('| **`'))
  return {
    item1: parseMarkdown(mdLines[0] || ''),
    item2: parseMarkdown(mdLines[1] || ''),
    item3: parseMarkdown(mdLines[2] || ''),
    item4: parseMarkdown(mdLines[3] || ''),
    item5: parseMarkdown(mdLines[4] || ''),
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
