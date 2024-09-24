'use server'

import { Product } from '@prisma/client'
import { revalidatePath } from 'next/cache'

type AddProductData = Omit<Product, 'id'>

export const addProduct = async (product: AddProductData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/admin/product/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    revalidatePath('/admin/products')
    await response.json()
    return { success: 'Product added' }
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
