// legacy article-fetching endpoint linked from https://master-coda.cz/
export default defineEventHandler(async (): Promise<Last5Articles> => {
  return await getLast5Articles('java')
})
