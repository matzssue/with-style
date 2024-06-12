'use client'

import { removeFromWishlist } from '@/actions/remove-product-from-wishlist'

import { Delete } from 'lucide-react'
import { useSession } from 'next-auth/react'

export const RemoveProductFromWishlist = ({
  productId,
}: {
  productId: string
}) => {
  const session = useSession()
  const userId = session.data?.user.id

  const deleteProduct = async () => {
    if (userId) await removeFromWishlist(userId, productId)
  }

  return (
    <form action={deleteProduct}>
      <button
        type='submit'
        className='absolute -right-2 -top-2 cursor-pointer rounded-sm border border-secondary bg-neutral-50 px-4 py-2 font-semibold'
      >
        <Delete />
      </button>
    </form>
  )
}
