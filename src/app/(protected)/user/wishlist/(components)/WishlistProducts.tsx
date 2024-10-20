import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { RemoveProductFromWishlist } from './RemoveProductFromWishlist'
import { ProductPrice } from '@/app/(components)/Products/ProductPrice/ProductPrice'
import { publicRoutes } from '@/routes'
export const WishlistProducts = ({ products }: { products: Product[] }) => {
  return (
    <ul className='flex w-full flex-wrap gap-5 max-lg:justify-center'>
      {products.map(({ id, discountPercentage, imgUrl, name, price }) => (
        <li
          key={id}
          className='relative flex w-full max-w-[200px] flex-col justify-between gap-5 rounded-md bg-secondary p-5 shadow-md max-md:max-w-[250px]'
        >
          <RemoveProductFromWishlist productId={id} />

          <div className='my-3'>
            <p className='text-xl font-bold'>{name}</p>
            <ProductPrice
              discountPercentage={discountPercentage}
              price={price}
            />
          </div>
          <Image
            height={250}
            width={150}
            style={{ width: 'auto', height: 'auto', maxHeight: '250px' }}
            alt={name}
            src={imgUrl}
          />
          <div className='flex flex-col gap-x-5 py-1'>
            <div className='flex items-center gap-4 max-md:flex-col'>
              <Link
                className='w-full rounded-sm bg-white px-4 py-2 shadow-sm hover:scale-105 max-md:w-full'
                href={`/${publicRoutes.product}/${id}`}
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
