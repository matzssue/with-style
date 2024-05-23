import axios from 'axios'
import { ProductList } from '../../(components)/ProductsList'
import { ProductsMenu } from '../../(components)/ProductsMenu'

type Params = {
  [key: string]: string
}

export default async function CategoryProducts({
  params,
  searchParams,
}: {
  params: Params
  searchParams: Params
}) {
  async function fetchProducts() {
    const response = await axios.get(
      `http://localhost:3000/api/products/${params.categorySlug}`,
      {
        params: {
          category: params.categorySlug,
          size: searchParams.size,
          minPrice: searchParams.minPrice,
          maxPrice: searchParams.maxPrice,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.status !== 200) {
      throw new Error('Failed to fetch products')
    }

    return response.data
  }

  const products = await fetchProducts()

  return (
    <>
      <ProductsMenu />
      <ProductList products={products} />
    </>
  )
}
