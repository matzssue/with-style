'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { adminRoutes } from '@/routes'

import { Order } from '@prisma/client'
import { revalidateTag } from 'next/cache'

export const updateOrder = async (
  orderId: string,
  updateData: Partial<Order>
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/${adminRoutes.orders}/update`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: getCookies(),
        },
        body: JSON.stringify({ orderId, updateData }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    revalidateTag(orderTag)
    return { success: 'Order successfully updated' }
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
