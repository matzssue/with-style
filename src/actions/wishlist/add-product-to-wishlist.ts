'use server'

import {
  categoryTag,
  typeTag,
  wishlistTag,
} from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { userRoutes } from '@/routes'
import { FetchDataResponse } from '@/types/data'
import { revalidateTag } from 'next/cache'

export const addToWishlist = async (productId: string) => {
  const wishlistData = await fetchData<FetchDataResponse>(
    `api/${userRoutes.wishlist}/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: getCookies(),
      },
      body: JSON.stringify({
        productId,
      }),
    }
  )

  revalidateTag(wishlistTag)
  revalidateTag(categoryTag)
  revalidateTag(typeTag)

  return wishlistData
}
