'use server'

import { wishlistTag } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { WishlistData } from '@/types/wishlist'
import { Product } from '@prisma/client'
import { headers } from 'next/headers'
type QueryParams = {
  page?: string
}

export async function getWishlist(page: string) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/user/wishlist`
  )
  const queryParams: QueryParams = {}

  if (page) queryParams.page = page
  url.search = new URLSearchParams(queryParams).toString()

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: headers(),
    next: { tags: [wishlistTag] },
  })
  const data: WishlistData = await response.json()

  return data
}

export async function getWishlistProductsId() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/user/wishlist`,
    {
      method: 'GET',
      headers: headers(),
      next: { tags: [wishlistTag] },
    }
  )

  const products = await response.json()

  if (products.error) {
    throw new Error(products.error)
  }
  const productsId: string[] = products.data.map(
    (product: Product) => product.id
  )
  return productsId
}
