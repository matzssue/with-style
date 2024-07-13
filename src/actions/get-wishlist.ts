'use server'

import { UserWishlist } from '@/app/api/user/wishlist/route'
import { WishlistData } from '@/types/wishlist'
import { Product } from '@prisma/client'

type QueryParams = {
  page?: string
  userId?: string
}

export async function getWishlist(userId: string | undefined, page: string) {
  const url = new URL(`http://localhost:3000/api/user/wishlist`)
  const queryParams: QueryParams = {}

  if (page) queryParams.page = page
  if (userId) queryParams.userId = userId
  url.search = new URLSearchParams(queryParams).toString()

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['wishlist'] },
  })
  const data: WishlistData = await response.json()

  return data
}

export async function getWishlistProductsId(userId: string | undefined) {
  if (!userId) return []

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/user/wishlist?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['wishlist'] },
    }
  )

  const products = await response.json()

  const productsId: string[] = products.data.map(
    (product: Product) => product.id
  )
  return productsId
}
