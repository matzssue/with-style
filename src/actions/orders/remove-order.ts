'use server'

import { orderTag } from '@/constants/revalidation-keys'
import { fetchData } from '@/lib/helplers/fetchData'
import { adminRoutes } from '@/routes'
import { FetchDataResponse } from '@/types/data'

import { revalidateTag } from 'next/cache'

export const removeOrder = async (orderId: string) => {
  const order = await fetchData<FetchDataResponse>(
    `api/${adminRoutes.orders}/delete`,
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

  revalidateTag(orderTag)
  return order
}
