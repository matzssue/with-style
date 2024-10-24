import { WishlistProducts } from './WishlistProducts'

import { Paginator } from '@/components/Paginator/Paginator'
import { getWishlist } from '@/data/wishlist/get-wishlist'

export const WishlistMenu = async ({ page }: { page: string }) => {
  const pageNumber = Number(page || 1)
  const { data, metadata } = await getWishlist(page)

  return (
    <div className='flex flex-col items-center justify-around  gap-5'>
      <WishlistProducts products={data} />
      <Paginator page={pageNumber} totalPages={metadata.totalPages} />
    </div>
  )
}
