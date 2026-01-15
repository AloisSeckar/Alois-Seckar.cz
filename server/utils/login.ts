import type { H3Event } from 'h3'

export async function checkLogin(event: H3Event): Promise<boolean> {
  const session = await getUserSession(event)
  return !!session.user?.githubId && session.user.githubId === useRuntimeConfig().key
}
