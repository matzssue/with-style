'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { OrdersData } from '@/types/orders'

type QueryParams = {
  page?: string
  userId?: string
}

export async function getOrders(userId: string | undefined, page: number) {
  const url = new URL(`${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/orders`)
  const queryParams: QueryParams = {}

  if (page) queryParams.page = page.toString()
  if (userId) queryParams.userId = userId
  url.search = new URLSearchParams(queryParams).toString()

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: getCookies(),
    },

    next: { tags: [orderTag] },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const data: OrdersData = await response.json()

  return data
}
