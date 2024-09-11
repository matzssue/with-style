import { Paginator } from '@/components/Paginator/Paginator'
import { getProducts } from '@/data/products/get-products'
import { AdminProductList } from '../(components)/AdminProductList'

export default async function ProductsAdmin({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const pageNumber = Number(searchParams.page || 1)
  const queryParams = {
    page: pageNumber.toString(),
  }

  const { data, metadata } = await getProducts(queryParams)

  return (
    <div>
      <AdminProductList products={data} />
      <Paginator page={pageNumber} totalPages={metadata.totalPages} />
    </div>
  )
}
