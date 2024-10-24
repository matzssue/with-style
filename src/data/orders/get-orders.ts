'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { fetchData } from '@/lib/helplers/fetchData'
import { userRoutes } from '@/routes'
import { OrdersData } from '@/types/orders'
import { headers } from 'next/headers'

type QueryParams = {
  page?: string
  userId?: string
}

export const getOrders = async (page: number): Promise<OrdersData> => {
  const queryParams: QueryParams = {}

  if (page) queryParams.page = page.toString()

  const order = await fetchData<OrdersData>(`api/${userRoutes.orders}`, {
    queryParams: queryParams,
    headers: new Headers(headers()),
    next: { tags: [orderTag] },
  })

  return order
}
