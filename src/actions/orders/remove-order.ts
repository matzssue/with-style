'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { revalidateTag } from 'next/cache'

export const removeOrder = async (orderId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/orders/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
        }),
      }
    )

    const data = await response.json()
    revalidateTag(orderTag)
    return data
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
