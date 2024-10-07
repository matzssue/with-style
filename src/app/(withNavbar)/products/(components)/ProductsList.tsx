import Link from 'next/link'

import type { Product } from '@prisma/client'

import { AddProduct } from '../../product/[productId]/(components)/AddProduct'

import { WishlistToggleButton } from '../../../(protected)/user/(components)/WishlistToggleButton'
import { ProductCard } from '@/components/Cards/ProductCard'
import { publicRoutes } from '@/routes'

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
      {products.length === 0 && (
        <p className='text-center text-2xl'>No products found</p>
      )}
      <ul className='flex flex-wrap gap-5 max-lg:justify-center'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product}>
            <div className='flex items-center gap-4 max-md:flex-col'>
              <Link
                className='rounded-sm bg-white px-4 py-2 shadow-sm hover:scale-105 max-md:w-full'
                href={`/${publicRoutes.product}/${product.id}`}
              >
                Go to product
              </Link>
              <div className='flex items-center justify-center gap-4 '>
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
