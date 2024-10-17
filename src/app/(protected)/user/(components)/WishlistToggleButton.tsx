'use client'

import { Button } from '@/components/ui/button'

import { addToWishlist } from '@/actions/wishlist/add-product-to-wishlist'

import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import { removeFromWishlist } from '@/actions/wishlist/remove-product-from-wishlist'
import { toast } from 'sonner'
import { useState } from 'react'
import { Loading } from '@/components/Loading/Loading'

export const WishlistToggleButton = ({
  productId,
  withText = false,
  isWishlisted,
}: {
  productId: string
  withText?: boolean
  isWishlisted: boolean
}) => {
  const session = useSession()
  const router = useRouter()
  const userId = session.data?.user.id
  const [loading, setLoading] = useState<boolean>(false)

  const handleWishlistItem = async () => {
    setLoading(true)
    if (session.status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }

    if (isWishlisted && userId) {
      await removeFromWishlist(productId)

      toast('Product removed from wishlist')
    }
    if (!isWishlisted && userId) {
      await addToWishlist(productId)

      toast('Product added to wishlist')
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  if (loading) return <Loading />

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
