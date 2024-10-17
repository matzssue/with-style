'use server'

import { adminProductPath, productPath } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { adminRoutes } from '@/routes'
import { FetchDataResponse } from '@/types/data'
import { revalidatePath } from 'next/cache'

export const deleteProduct = async (productId: string) => {
  const productData = await fetchData<FetchDataResponse>(
    `api/${adminRoutes.product}/delete`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: getCookies(),
      },
      body: JSON.stringify({ productId }),
    }
  )

  revalidatePath(productPath)
  revalidatePath(adminProductPath)

  return productData
}
