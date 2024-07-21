import Image from 'next/image'
import Link from 'next/link'

import type { Product } from '@prisma/client'

import { AddProduct } from '../../product/[productId]/(components)/AddProduct'

import { WishlistToggleButton } from '../../user/(components)/WishlistToggleButton'

export type Wishlisted = {
  productId: string
}

export const ProductList = ({
  products,
  wishlisted,
}: {
  products: Product[]
  wishlisted: string[] | []
}) => {
  return (
    <div className='p-6'>
      <ul className='flex flex-wrap gap-5 max-lg:justify-center'>
        {products.map((product) => (
          <li
            key={product.id}
            className='relative flex w-[300px] flex-col justify-between gap-5 rounded-md bg-secondary p-10 shadow-md  max-md:w-[250px]'
          >
            {product.subcategory && (
              <span className='absolute -right-2 -top-2 rounded-sm border border-secondary bg-neutral-50 px-4 py-2 font-semibold'>
                {product.subcategory}
              </span>
            )}
            <div>
              <p className='text-xl font-bold'>{product.name}</p>
              <p className=' font-semibold italic'>{product.type}</p>
            </div>

            <Image
              height={300}
              width={200}
              style={{ width: 'auto', height: 'auto', maxHeight: '320px' }}
              alt={product.name}
              src={product.imgUrl}
            />
            <div className='flex flex-col gap-x-5 py-1'>
              <p className='py-2 text-lg'>
                Price: <span className='font-semibold'> {product.price} $</span>
              </p>

              <div className='flex items-center gap-4 max-md:flex-col'>
                <Link
                  className='rounded-sm bg-white px-4 py-2 shadow-sm hover:scale-105 max-md:w-full'
                  href={`/product/${product.id}`}
                >
                  Go to product
                </Link>
                <div className='flex items-center justify-center max-md:gap-5'>
                  <WishlistToggleButton
                    wishlisted={wishlisted}
                    productId={product.id}
                  />
                  <AddProduct {...product} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
