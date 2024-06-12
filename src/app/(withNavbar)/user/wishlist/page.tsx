import { WishlistMenu } from './(components)/WishlistMenu'

export default function Wishlist() {
  return (
    <section className='mx-[10%]'>
      <h1 className='py-5 text-center text-3xl'>You'r wishlist</h1>
      <WishlistMenu />
    </section>
  )
}
