'use server'

import { OrderData } from '@/types/orders'

type QueryParams = {
  orderId?: string
}

export async function getOrder(orderId: string) {
  const url = new URL(
    `${process.env.VERCEL_DOMAIN}/api/order-details/${orderId}`
  )
  const queryParams: QueryParams = {}

  if (orderId) queryParams.orderId = orderId

  url.search = new URLSearchParams(queryParams).toString()

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const data: OrderData = await response.json()
  return data
}
