import { getCookies } from '@/lib/auth/sessionCookies'
import { OrderData } from '@/types/orders'

type QueryParams = {
  orderId?: string
}

export async function getOrder(orderId: string) {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/order-details/${orderId}`
    )
    const queryParams: QueryParams = {}

    if (orderId) queryParams.orderId = orderId

    url.search = new URLSearchParams(queryParams).toString()

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: getCookies(),
      },
      cache: 'no-cache',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch order. Status: ${response.status}`)
    }

    const data: OrderData = await response.json()

    return data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw new Error('Something went wrong')
  }
}
