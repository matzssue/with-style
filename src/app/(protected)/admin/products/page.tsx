import { ProductList } from '@/app/(withNavbar)/products/(components)/ProductsList'
import { Paginator } from '@/components/Paginator/Paginator'
import { getProducts } from '@/data/products/get-products'
import { AdminProductList } from '../(components)/AdminProductList'
// import { useEffect, useState } from 'react'

export default async function ProductsAdmin({ searchParams }) {
  console.log(searchParams, 'searchParams')
  // const [products, setProducts] = useState({})

  const pageNumber = Number(searchParams.page || 1)
  const queryParams = {
    page: pageNumber,
  }

  const { data, metadata } = await getProducts(queryParams)

  return (
    <div>
      <AdminProductList products={data} />
      <Paginator page={pageNumber} totalPages={metadata.totalPages} />
    </div>
  )
}
