export default defineEventHandler(async (event): Promise<boolean> => {
  return await checkLogin(event)
})
