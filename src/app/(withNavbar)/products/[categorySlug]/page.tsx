import { ProductList } from '../../(components)/ProductsList'
import { getWishlistProductsId } from '@/actions/get-wishlist'
import { auth } from '@/auth'

import { Paginator } from '../../(components)/Paginator'

import { ProductsData } from '@/types/products'

type Params = {
  [key: string]: string
}
type QueryParams = {
  category?: string
  size?: string
  minPrice?: string
  maxPrice?: string
  page?: string
}

export default async function CategoryProducts({
  params,
  searchParams,
}: {
  params: Params
  searchParams: Params
}) {
  const session = await auth()
  const userId = session?.user.id
  const pageNumber = Number(searchParams.page || 1)

  async function fetchProducts() {
    const url = new URL(
      `http://localhost:3000/api/products/${params.categorySlug}`
    )
    const queryParams: QueryParams = {}
    if (params.categorySlug) queryParams.category = params.categorySlug
    if (searchParams.minPrice) queryParams.minPrice = searchParams.minPrice
    if (searchParams.maxPrice) queryParams.maxPrice = searchParams.maxPrice
    if (searchParams.size) queryParams.size = searchParams.size
    if (searchParams.page) queryParams.page = searchParams.page

    url.search = new URLSearchParams(queryParams).toString()

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['categoryProducts'] },
    })

    if (response.status !== 200) {
      throw new Error('Failed to fetch products')
    }

    const data: ProductsData = await response.json()
    return data
  }

  const { data, metadata }: ProductsData = await fetchProducts()
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
