'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { OrdersData } from '@/types/orders'

type QueryParams = {
  page?: string
  userId?: string
  search?: string
}

export async function getAllOrders(filters: QueryParams) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/admin/orders/all`
  )
  const queryParams: QueryParams = {}

  if (filters.page) queryParams.page = filters.page.toString() ?? '1'
  if (filters.search) queryParams.search = filters.search

  url.search = new URLSearchParams(queryParams).toString()

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: [orderTag] },
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const data: OrdersData = await response.json()

  return data
}
