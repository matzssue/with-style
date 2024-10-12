'use server'

import { productPath } from '@/constants/revalidation-keys'
import { getCookies } from '@/lib/auth/sessionCookies'
import { revalidatePath } from 'next/cache'

export const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/admin/product/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Cookie: getCookies(),
        },
        body: JSON.stringify({ productId }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    revalidatePath(productPath)
    await response.json()
    return { success: 'Product deleted' }
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
