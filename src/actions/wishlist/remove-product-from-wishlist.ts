'use server'

import { revalidateTag } from 'next/cache'

export async function removeFromWishlist(userId: string, productId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/user/wishlist/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
        }),
      }
    )
    revalidateTag('wishlist')
    revalidateTag('categoryProducts')
    revalidateTag('typeProducts')
    await response.json()
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
