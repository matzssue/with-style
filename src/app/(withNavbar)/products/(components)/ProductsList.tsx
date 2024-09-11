import Image from 'next/image'
import Link from 'next/link'

import type { Product } from '@prisma/client'

import { AddProduct } from '../../product/[productId]/(components)/AddProduct'

import { WishlistToggleButton } from '../../user/(components)/WishlistToggleButton'
import { ProductCard } from '@/components/Cards/ProductCard'

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
          <ProductCard key={product.id} product={product}>
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
          </ProductCard>
        ))}
      </ul>
    </div>
  )
}
