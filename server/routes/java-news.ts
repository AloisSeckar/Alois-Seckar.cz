export default defineEventHandler(async (): Promise<Last5News> => {
  return await getLast5News('https://raw.githubusercontent.com/AloisSeckar/demos-java/master/JavaNews.md')
})
