'use server'

import { currentUser } from '@/lib/auth'
import { AddOrderData } from '@/types/products'
import { revalidateTag } from 'next/cache'

export const addOrder = async (orderData: AddOrderData) => {
  const user = await currentUser()

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/orders/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderData,
          user,
        }),
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    revalidateTag('orders')
    return data
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
