import { cookies } from 'next/headers'

export const getCookies = () => {
  const allCookies = cookies().getAll()
  const sessionCookies = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  if (!sessionCookies) {
    throw new Error('User not authenticated - cookies missing')
  }

  return sessionCookies
}
