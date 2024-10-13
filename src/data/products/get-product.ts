import { getCookies } from '@/lib/auth/sessionCookies'
import { Product } from '@prisma/client'

export const getProduct = async (id: string) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/product`)
    const querySearch = {
      productId: id,
    }
    url.search = new URLSearchParams(querySearch).toString()

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data: Product = await response.json()
    return data
  } catch (err) {
    throw new Error('Error getting product')
  }
}
