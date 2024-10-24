'use server'

import { wishlistTag } from '@/constants/revalidation-keys'

import { fetchData } from '@/lib/helplers/fetchData'
import { userRoutes } from '@/routes'
import { WishlistData } from '@/types/wishlist'
import { Product } from '@prisma/client'
import { headers } from 'next/headers'

type QueryParams = {
  page?: string
}

export const getWishlist = async (page: string): Promise<WishlistData> => {
  const queryParams: QueryParams = {}

  if (page) queryParams.page = page
  const wishlist = await fetchData<WishlistData>(`api/${userRoutes.wishlist}`, {
    next: { tags: [wishlistTag] },
    queryParams: queryParams,
    headers: headers(),
  })

  return wishlist
}

export async function getWishlistProductsId() {
  const wishlist = await fetchData<WishlistData>(`api/${userRoutes.wishlist}`, {
    next: { tags: [wishlistTag] },
    headers: headers(),
  })
  const productsId: string[] = wishlist.data.map(
    (product: Product) => product.id
  )
  return productsId
}
