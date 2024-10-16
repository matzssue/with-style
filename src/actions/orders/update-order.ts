'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { userRoutes } from '@/routes'

import { Order } from '@prisma/client'
import { revalidateTag } from 'next/cache'

export const updateOrder = async (
  orderId: string,
  updateData: Partial<Order>
) => {
  const order = await fetchData<Order>(`api/${userRoutes.orders}/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Cookie: getCookies(),
    },
    body: JSON.stringify({ orderId, updateData }),
  })

  revalidateTag(orderTag)
  return order
}
