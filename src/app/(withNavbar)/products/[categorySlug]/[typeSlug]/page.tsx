import axios from 'axios'
import { ProductList } from '@/app/(withNavbar)/(components)/ProductsList'
import { ProductsMenu } from '@/app/(withNavbar)/(components)/ProductsMenu'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { getWishlistProductsId } from '@/actions/get-wishlist'
import { auth } from '@/auth'

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

  const getProducts = async () => {
    const url = new URL(
      `http://localhost:3000/api/products/${params.categorySlug}/${params.typeSlug}`
    )
    console
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

    const data = await response.json()
    return data
  }
  console.log('session', session)

  const products = await getProducts()
  const userWishlist = await getWishlistProductsId(userId)
  const wishlist = session ? userWishlist : []

  return <ProductList wishlisted={wishlist} products={products} />
}
