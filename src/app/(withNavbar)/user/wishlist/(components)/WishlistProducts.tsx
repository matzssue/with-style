import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { RemoveProductFromWishlist } from './RemoveProductFromWishlist'
export const WishlistProducts = ({ products }: { products: Product[] }) => {
  return (
    <ul className='flex flex-wrap gap-5 max-lg:justify-center'>
      {products.map((product) => (
        <li
          key={product.id}
          className='relative flex w-[200px] flex-col justify-between gap-5 rounded-md bg-secondary p-5 shadow-md max-md:w-[150px]'
        >
          <RemoveProductFromWishlist productId={product.id} />

          <div className='my-3'>
            <p className='text-xl font-bold'>{product.name}</p>
            <p className='text-sm font-semibold'>{product.price}</p>
          </div>
          <Image
            height={250}
            width={150}
            style={{ width: 'auto', height: 'auto', maxHeight: '250px' }}
            alt={product.name}
            src={product.imgUrl}
          />
          <div className='flex flex-col gap-x-5 py-1'>
            <div className='flex items-center gap-4 max-md:flex-col'>
              <Link
                className='w-full rounded-sm bg-white px-4 py-2 shadow-sm hover:scale-105 max-md:w-full'
                href={`/product/${product.id}`}
              >
                Go to product
              </Link>
            </div>
          </div>
        </li>
      ))}
      {products.length === 0 && <p>No products in wishlist</p>}
    </ul>
  )
}
