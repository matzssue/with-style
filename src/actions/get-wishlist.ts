'use server'

import { UserWishlist } from '@/app/api/user/wishlist/route'
import { Product } from '@prisma/client'

export async function getWishlist(userId: string | undefined) {
  const response = await fetch(
    `http://localhost:3000/api/user/wishlist?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['wishlist'] },
    }
  )

  const data: Product[] = await response.json()
  return data
}

export async function getWishlistProductsId(userId: string | undefined) {
  if (!userId) return []

  const response = await fetch(
    `http://localhost:3000/api/user/wishlist?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['wishlist'] },
    }
  )

  const data = await response.json()
  const productsId: string[] = data.map((product: Product) => product.id)
  return productsId
}
