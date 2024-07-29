'use server'

import { Product } from '@prisma/client'

type AddProductData = Omit<Product, 'id'>

export const addProduct = async (product: AddProductData) => {
  try {
    const response = await fetch(
      `${'http://localhost:3000'}/api/admin/product/add`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
