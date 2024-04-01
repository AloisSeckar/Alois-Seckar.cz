export default defineEventHandler(async (): Promise<Last5Articles> => {
  return await getLast5Articles('https://raw.githubusercontent.com/AloisSeckar/master-coda/master/CodaDigest.md')
})
