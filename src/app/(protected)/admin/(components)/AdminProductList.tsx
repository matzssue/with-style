'use client'

import { ProductCard } from '@/components/Cards/ProductCard'
import { Product } from '@prisma/client'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
export const AdminProductList = ({ products }: { products: Product[] }) => {
  const [searchValue, setSearchValue] = useState('')
  const [productsData, setProductsData] = useState(products)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      const selectedProducts = searchValue === '' ? products : filteredProducts
      setProductsData(selectedProducts)
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [searchValue, products])

  return (
    <div className='my-5 flex flex-col flex-wrap gap-5 px-5'>
      <div>
        <label>Search product</label>
        <Input
          type='search'
          value={searchValue ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
          id='searchInput'
          placeholder='search '
        />
      </div>
      <div className='flex flex-wrap gap-5'>
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product}>
            <div className='flex gap-5 '>
              <Button asChild>
                <Link href={`/admin/products/edit/${product.id}`}>Edit</Link>
              </Button>
              <Button asChild>
                <Link href='delete'>Delete</Link>
              </Button>
            </div>
          </ProductCard>
        ))}
      </div>
    </div>
  )
}
