import { ProductList } from '../../(components)/ProductsList'
import { getWishlistProductsId } from '@/actions/get-wishlist'
import { auth } from '@/auth'

type Params = {
  [key: string]: string
}
type QueryParams = {
  category?: string
  size?: string
  minPrice?: string
  maxPrice?: string
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

  async function fetchProducts() {
    const url = new URL(
      `http://localhost:3000/api/products/${params.categorySlug}`
    )
    const queryParams: QueryParams = {}
    if (params.categorySlug) queryParams.category = params.categorySlug
    if (searchParams.minPrice) queryParams.minPrice = searchParams.minPrice
    if (searchParams.maxPrice) queryParams.maxPrice = searchParams.maxPrice
    if (searchParams.size) queryParams.size = searchParams.size
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

    const data = await response.json()
    return data
  }

  const products = await fetchProducts()
  const userWishlist = await getWishlistProductsId(userId)

  return <ProductList wishlisted={userWishlist} products={products} />
}
