'use client'

import { removeFromWishlist } from '@/actions/remove-product-from-wishlist'

import { Button } from '@/components/ui/button'

import { addToWishlist } from '@/actions/add-product-to-wishlist'

import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { navigate } from '@/actions/navigate'
import { useRouter } from 'next/navigation'

export const WishlistToggleButton = ({
  productId,
  withText = false,
  wishlisted,
}: {
  productId: string
  withText?: boolean
  wishlisted: string[]
}) => {
  const session = useSession()
  const router = useRouter()
  const userId = session.data?.user.id

  const isWishlisted = wishlisted.includes(productId)

  const handleWishlistItem = () => {
    if (session.status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }
    if (isWishlisted && userId) {
      removeFromWishlist(userId, productId)
    }
    if (!isWishlisted && userId) {
      addToWishlist(userId, productId)
    }
  }

  return (
    <>
      {withText ? (
        <Button className='flex gap-3' onClick={() => handleWishlistItem()}>
          {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          <Heart
            className={`cursor-pointer hover:scale-125 hover:fill-red-500 ${isWishlisted ? 'fill-red-500' : ''}`}
          />
        </Button>
      ) : (
        <Heart
          onClick={() => handleWishlistItem()}
          className={`cursor-pointer hover:scale-125 hover:fill-red-500 ${isWishlisted ? 'fill-red-500' : ''}`}
        />
      )}
    </>
  )
}
