'use server'

import { productPath } from '@/constants/revalidation-keys'
import { productSchema } from '@/lib/schemas/product-schema'

import { Product } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const editProduct = async (updatedProduct: Partial<Product>) => {
  const productData = productSchema.safeParse(updatedProduct)

  if (productData.error) {
    return {
      error: productData.error.message,
    }
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/admin/product/edit`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    revalidatePath(productPath)
    return { success: 'Product successfully edited' }
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
