export default defineEventHandler(async (): Promise<Last5News> => {
  return await getLast5News('https://raw.githubusercontent.com/AloisSeckar/master-coda/master/CodaDigest.md')
})
