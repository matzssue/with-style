import { WishlistMenu } from './(components)/WishlistMenu'

type WishlistSearchParams = {
  page: string
}

export default function Wishlist({
  searchParams,
}: {
  searchParams: WishlistSearchParams
}) {
  const currentPage = searchParams.page

  return (
    <section className='mx-[10%]'>
      <h1 className='py-5 text-center text-3xl'>You&apos;r wishlist</h1>
      <WishlistMenu page={currentPage} />
    </section>
  )
}
