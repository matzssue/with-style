'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { currentUser } from '@/lib/auth/auth'
import { getCookies } from '@/lib/auth/sessionCookies'
import { AddOrderData } from '@/types/products'
import { revalidateTag } from 'next/cache'

export const addOrder = async (orderData: AddOrderData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/admin/orders/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: getCookies(),
        },
        body: JSON.stringify({
          orderData,
        }),
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
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
