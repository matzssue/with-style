'use server'

import { revalidateTag } from 'next/cache'

export async function removeFromWishlist(userId: string, productId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/user/wishlist/delete`,
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
  } catch (err) {
    console.log(err)
  }
}
