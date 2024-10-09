import { WishlistToggleButton } from '@/app/(protected)/user/(components)/WishlistToggleButton'
import { AddProductForm } from './AddProductForm'
import { Product } from '@prisma/client'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading/Loading'
import { auth } from '@/auth'
import { getWishlistProductsId } from '@/data/wishlist/get-wishlist'

export const ProductFormButtons = async ({ product }: { product: Product }) => {
  const session = await auth()
  const userId = session?.user.id
  const userWishlist = await getWishlistProductsId(userId)

  return (
    <div className='flex flex-col gap-2'>
      <AddProductForm product={product} />
      <WishlistToggleButton
        isWishlisted={userWishlist.includes(product.id)}
        withText
        productId={product.id}
      />
    </div>
  )
}
