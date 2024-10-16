'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { adminRoutes } from '@/routes'
import { OrdersData } from '@/types/orders'

type QueryParams = {
  page?: string
  userId?: string
  search?: string
}

export const getAllOrders = async (
  filters: QueryParams
): Promise<OrdersData> => {
  const queryParams: QueryParams = {}

  if (filters.page) queryParams.page = filters.page.toString() ?? '1'
  if (filters.search) queryParams.search = filters.search

  const orders = await fetchData<OrdersData>(`api/${adminRoutes.orders}/all`, {
    queryParams: queryParams,
    headers: {
      'Content-Type': 'application/json',
      Cookie: getCookies(),
    },
    next: { tags: [orderTag] },
  })

  return orders
}
