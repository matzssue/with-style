'use server'

import { UserWishlist } from '@/app/api/user/wishlist/route'
import {
  categoryTag,
  typeTag,
  wishlistTag,
} from '@/constants/revalidation-keys'
import { revalidateTag } from 'next/cache'

export const addToWishlist = async (userId: string, productId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/user/wishlist/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
        }),
      }
    )
    revalidateTag(wishlistTag)
    revalidateTag(categoryTag)
    revalidateTag(typeTag)
    const data: UserWishlist = await response.json()
    return data
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
