'use server'

import { productPath } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { adminRoutes } from '@/routes'
import { FetchDataResponse } from '@/types/data'

import { Product } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const editProduct = async (updatedProduct: Partial<Product>) => {
  const productData = await fetchData<FetchDataResponse>(
    `api/${adminRoutes.product}/edit`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: getCookies(),
      },
      body: JSON.stringify(updatedProduct),
    }
  )

  revalidatePath(productPath)

  return productData
}
