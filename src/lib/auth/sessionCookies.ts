import { cookies } from 'next/headers'

export const getCookies = () => {
  const allCookies = cookies().getAll()
  const sessionCookies = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  return sessionCookies
}
