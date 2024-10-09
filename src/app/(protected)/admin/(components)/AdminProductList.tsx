'use client'

import { ProductCard } from '@/components/Cards/ProductCard'
import { Product } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { DeleteProductButton } from './DeleteProduct'
import { adminRoutes } from '@/routes'
import { Input } from '@/components/ui/input'
import { useSearch } from '@/hooks/use-search'

export const AdminProductList = ({ products }: { products: Product[] }) => {
  const { handleSearch } = useSearch(adminRoutes.products)

  return (
    <div className='my-5 flex flex-col flex-wrap gap-5 px-5'>
      <div className='flex w-full gap-4'>
        <label className='text-nowrap text-2xl font-bold'>
          Search by product name
        </label>
        <Input
          type='text'
          id='searchInput'
          placeholder={''}
          style={{ maxWidth: '300px' }}
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
        />
        <Button asChild>
          <Link href={`/${adminRoutes.products}/add`}>Add new product</Link>
        </Button>
      </div>
      <div className='flex flex-wrap gap-5 max-md:justify-center'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product}>
            <div className='flex gap-5 '>
              <Button asChild>
                <Link href={`/${adminRoutes.products}/edit/${product.id}`}>
                  Edit
                </Link>
              </Button>
              <DeleteProductButton productId={product.id} />
            </div>
          </ProductCard>
        ))}
      </div>
    </div>
  )
}
