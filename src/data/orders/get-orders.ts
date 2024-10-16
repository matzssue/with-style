'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { fetchData } from '@/lib/helplers/fetchData'
import { publicRoutes } from '@/routes'
import { OrdersData } from '@/types/orders'

type QueryParams = {
  page?: string
  userId?: string
}

export const getOrders = async (page: number): Promise<OrdersData> => {
  const queryParams: QueryParams = {}

  if (page) queryParams.page = page.toString()

  const order = await fetchData<OrdersData>(`api/${publicRoutes.orders}`, {
    queryParams: queryParams,
    headers: {
      'Content-Type': 'application/json',
    },

    next: { tags: [orderTag] },
  })

  return order
}
