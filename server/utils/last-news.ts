import { parse } from 'node-html-parser'

export type NewsItem = {
  date: string,
  title: string,
  link: string,
  dscr: string,
}

export type Last5News = {
  item1: NewsItem,
  item2: NewsItem,
  item3: NewsItem,
  item4: NewsItem,
  item5: NewsItem,
}

export async function getLast5News (url: string): Promise<Last5News> {
  const htmlData = await $fetch<string>(url)
  const htmlPage = parse(htmlData)
  const markdown = htmlPage.innerText
  const mdLines = markdown.split('\n').filter(l => l.startsWith('| **`'))
  return {
    item1: parseMarkdown(mdLines[0]),
    item2: parseMarkdown(mdLines[1]),
    item3: parseMarkdown(mdLines[2]),
    item4: parseMarkdown(mdLines[3]),
    item5: parseMarkdown(mdLines[4])
  }
}

function parseMarkdown (entry: string): NewsItem {
  return {
    date: entry.substring(entry.indexOf('*`') + 2, entry.indexOf('`*')),
    title: entry.substring(entry.indexOf('| [') + 3, entry.indexOf('](')),
    link: entry.substring(entry.indexOf('](') + 2, entry.indexOf(') - ')),
    dscr: stripMarkdown(entry.substring(entry.indexOf(') - ') + 4, entry.lastIndexOf(' |')))
  }
}

function stripMarkdown (entry: string): string {
  return entry.replaceAll('**', '').replaceAll('_', '')
}
