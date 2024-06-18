import { WishlistProducts } from './WishlistProducts'
import { auth } from '@/auth'
import { getWishlist } from '@/actions/get-wishlist'
import { Paginator } from '@/app/(withNavbar)/(components)/Paginator'

export const WishlistMenu = async ({ page }: { page: string }) => {
  const session = await auth()
  const pageNumber = Number(page || 1)
  const { data, metadata } = await getWishlist(session?.user.id, page)

  return (
    <div className='flex flex-col items-center justify-around  gap-5'>
      <WishlistProducts products={data} />
      <Paginator page={pageNumber} totalPages={metadata.totalPages} />
    </div>
  )
}
