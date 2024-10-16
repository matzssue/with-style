'use server'

import { productPath } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { adminRoutes } from '@/routes'

import { Product } from '@prisma/client'
import { revalidatePath } from 'next/cache'

type AddProductData = Omit<Product, 'id'>

export const addProduct = async (product: AddProductData) => {
  const productData = await fetchData<Product>(
    `api/${adminRoutes.product}/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: getCookies(),
      },
      body: JSON.stringify(product),
    }
  )

  revalidatePath(productPath)

  return productData
}
