import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { getWishlistProductsId } from '@/data/wishlist/get-wishlist'
import { auth } from '@/auth'

import { ProductsData } from '@/types/products'
import { ProductList } from '../../(components)/ProductsList'
import { Paginator } from '@/components/Paginator/Paginator'

type ProductSearchParams = {
  [key: string]: string
}
type QueryParams = {
  category?: string
  type?: string
  size?: string
  minPrice?: string
  maxPrice?: string
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

  const getProducts = async () => {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/products/${params.categorySlug}/${params.typeSlug}`
    )

    const queryParams: QueryParams = {}
    if (params.categorySlug) queryParams.category = params.categorySlug
    if (params.typeSlug) queryParams.type = params.typeSlug
    if (searchParams.minPrice) queryParams.minPrice = searchParams.minPrice
    if (searchParams.maxPrice) queryParams.maxPrice = searchParams.maxPrice
    if (searchParams.size) queryParams.size = searchParams.size
    url.search = new URLSearchParams(queryParams).toString()

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['typeProducts'] },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data: ProductsData = await response.json()
    return data
  }

  const { data, metadata }: ProductsData = await getProducts()
  const userWishlist = await getWishlistProductsId(userId)
  const wishlist = session ? userWishlist : []

  return (
    <div className='flex w-full flex-col'>
      <ProductList wishlisted={wishlist} products={data} />
      <div className='flex w-full items-center'>
        <Paginator page={pageNumber} totalPages={metadata.totalPages} />
      </div>
    </div>
  )
}
