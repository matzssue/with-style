import axios from 'axios'
import { ProductList } from '@/app/(withNavbar)/(components)/ProductsList'
import { ProductsMenu } from '@/app/(withNavbar)/(components)/ProductsMenu'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

type ProductSearchParams = {
  [key: string]: string
}

export default async function TypeProducts({
  params,
  searchParams,
}: {
  params: Params
  searchParams: ProductSearchParams
}) {
  console.log(searchParams, 'search2')
  async function fetchProducts() {
    const response = await axios.get(
      `http://localhost:3000/api/products/${params.categorySlug}/${params.typeSlug}`,
      {
        params: {
          category: params.categorySlug,
          type: params.typeSlug,
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
