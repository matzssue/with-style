import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

import {
  ProductsData,
  ProductSearchParams,
  ProductsQueryParams,
} from '@/types/products'

import { Paginator } from '@/components/Paginator/Paginator'
import { ProductList } from '../(components)/ProductsList'
import { getProducts } from '@/data/products/get-products'
import { SortingMenu } from '../(components)/SortingMenu'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading/Loading'
import { ProductsMenu } from '../(components)/ProductsMenu'

import { getLinksForCategory } from '@/lib/helplers/getLinksForCategory'

export default async function TypeProducts({
  params,
  searchParams,
}: {
  params: Params
  searchParams: ProductSearchParams
}) {
  const pageNumber = Number(searchParams.page || 1)
  const categorySlug = params.productsSlug[0]
  const typeSlug = params.productsSlug[1]

  const queryParams: ProductsQueryParams = {}
  if (categorySlug) queryParams.category = categorySlug
  if (typeSlug) queryParams.type = typeSlug
  if (searchParams.subcategory)
    queryParams.subcategory = searchParams.subcategory
  if (searchParams.minPrice) queryParams.minPrice = searchParams.minPrice
  if (searchParams.maxPrice) queryParams.maxPrice = searchParams.maxPrice
  if (searchParams.size) queryParams.size = searchParams.size
  if (searchParams.promotions) queryParams.promotions = 'true'
  if (searchParams.sortByPrice)
    queryParams.sortByPrice = searchParams.sortByPrice
  queryParams.page = pageNumber.toString()

  const { data, metadata }: ProductsData = await getProducts(queryParams)

  return (
    <>
      <ProductsMenu
        categories={getLinksForCategory(categorySlug)}
        categorySlug={categorySlug}
      />
      <div className='flex w-full flex-col'>
        <SortingMenu />
        <Suspense
          fallback={
            <div className='my-14'>
              <Loading />
            </div>
          }
        >
          <ProductList products={data} />
        </Suspense>
        <div className='flex w-full items-center'>
          <Paginator page={pageNumber} totalPages={metadata.totalPages} />
        </div>
      </div>
    </>
  )
}
