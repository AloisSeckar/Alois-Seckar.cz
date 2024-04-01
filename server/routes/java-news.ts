export default defineEventHandler(async (): Promise<Last5Articles> => {
  return await getLast5Articles('https://raw.githubusercontent.com/AloisSeckar/demos-java/master/JavaNews.md')
})
