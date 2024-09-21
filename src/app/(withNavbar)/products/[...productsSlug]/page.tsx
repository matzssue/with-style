import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { getWishlistProductsId } from '@/data/wishlist/get-wishlist'
import { auth } from '@/auth'

import { ProductsData, ProductsQueryParams } from '@/types/products'

import { Paginator } from '@/components/Paginator/Paginator'
import { ProductList } from '../(components)/ProductsList'
import { getProducts } from '@/data/products/get-products'
import { SortingMenu } from '../(components)/SortingMenu'

type ProductSearchParams = {
  minPrice?: string
  maxPrice?: string
  size?: string
  page?: string
  sortByPrice?: string
  promotions?: boolean
}

export default async function TypeProducts({
  params,
  searchParams,
}: {
  params: Params
  searchParams: ProductSearchParams
}) {
  const session = await auth()
  const userId = session?.user.id
  const pageNumber = Number(searchParams.page || 1)
  const categorySlug = params.productsSlug[0]
  const typeSlug = params.productsSlug[1]

  const queryParams: ProductsQueryParams = {}
  if (categorySlug) queryParams.category = categorySlug
  if (typeSlug) queryParams.type = typeSlug
  if (searchParams.minPrice) queryParams.minPrice = searchParams.minPrice
  if (searchParams.maxPrice) queryParams.maxPrice = searchParams.maxPrice
  if (searchParams.size) queryParams.size = searchParams.size
  if (searchParams.promotions) queryParams.promotions = 'true'
  if (searchParams.sortByPrice)
    queryParams.sortByPrice = searchParams.sortByPrice
  queryParams.page = pageNumber.toString()

  const { data, metadata }: ProductsData = await getProducts(queryParams)

  const userWishlist = await getWishlistProductsId(userId)
  const wishlist = session ? userWishlist : []

  return (
    <div className='flex w-full flex-col'>
      <SortingMenu />
      <ProductList wishlisted={wishlist} products={data} />
      <div className='flex w-full items-center'>
        <Paginator page={pageNumber} totalPages={metadata.totalPages} />
      </div>
    </div>
  )
}
