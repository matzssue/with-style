'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { adminRoutes } from '@/routes'
import { OrdersData } from '@/types/orders'
import { AddOrderData } from '@/types/products'

import { revalidateTag } from 'next/cache'

export const addOrder = async (orderData: AddOrderData) => {
  const order = await fetchData<OrdersData>(`api/${adminRoutes.orders}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: getCookies(),
    },
    body: JSON.stringify({ orderData }),
  })

  revalidateTag(orderTag)
  return order
}
