'use client'

import { ProductCard } from '@/components/Cards/ProductCard'
import { Product } from '@prisma/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/Searchbar/SearchInput'
import { useSelectList } from '@/hooks/use-select-list'
import { DeleteProductButton } from './DeleteProduct'

export const AdminProductList = ({ products }: { products: Product[] }) => {
  const filterByName = (item: Product, searchValue: string) => {
    return item.name
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  }

  const { listData, searchValueHandler, searchValue } = useSelectList<Product>(
    products,
    filterByName
  )

  return (
    <div className='my-5 flex flex-col flex-wrap gap-5 px-5'>
      <div>
        <SearchInput
          placeholder='search by product name'
          title='Search product'
          setSearchValue={searchValueHandler}
          value={searchValue}
        />
      </div>
      <div className='flex flex-wrap gap-5'>
        {listData.map((product) => (
          <ProductCard key={product.id} product={product}>
            <div className='flex gap-5 '>
              <Button asChild>
                <Link href={`/admin/products/edit/${product.id}`}>Edit</Link>
              </Button>
              <DeleteProductButton productId={product.id} />
            </div>
          </ProductCard>
        ))}
      </div>
    </div>
  )
}
