'use server'

import {
  categoryTag,
  typeTag,
  wishlistTag,
} from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { revalidateTag } from 'next/cache'

export const addToWishlist = async (productId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/user/wishlist/add`,
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
    const data = await response.json()

    revalidateTag(wishlistTag)
    revalidateTag(categoryTag)
    revalidateTag(typeTag)

    if (data) {
      return { success: 'Product successfully added' }
    }
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
