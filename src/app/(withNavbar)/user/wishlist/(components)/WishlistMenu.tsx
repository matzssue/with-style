import { WishlistProducts } from './WishlistProducts'
import { auth } from '@/auth'
import { getWishlist } from '@/actions/get-wishlist'

export const WishlistMenu = async () => {
  const session = await auth()

  const wishlistProducts = await getWishlist(session?.user.id)

  return (
    <div className='flex items-center justify-center'>
      <WishlistProducts products={wishlistProducts} />
    </div>
  )
}
