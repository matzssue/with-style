'use server'

import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { userRoutes } from '@/routes'
import { FetchDataResponse } from '@/types/data'

import { revalidateTag } from 'next/cache'

export const removeFromWishlist = async (productId: string) => {
  const wishlistData = await fetchData<FetchDataResponse>(
    `api/${userRoutes.wishlist}/delete`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: getCookies(),
      },
      body: JSON.stringify({
        productId,
      }),
    }
  )

  revalidateTag('wishlist')
  revalidateTag('categoryProducts')
  revalidateTag('typeProducts')
  return wishlistData
}
