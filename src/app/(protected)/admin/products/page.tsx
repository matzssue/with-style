import { Paginator } from '@/components/Paginator/Paginator'
import { getProducts } from '@/data/products/get-products'
import { AdminProductList } from '../(components)/AdminProductList'

type AdminProductsQuery = {
  page?: string
  search?: string
}

export default async function ProductsAdmin({
  searchParams,
}: {
  searchParams: { page: string; search: string }
}) {
  const pageNumber = Number(searchParams.page || 1)
  const { search } = searchParams
  const queryParams: AdminProductsQuery = {
    page: pageNumber.toString(),
  }

  if (search) {
    queryParams.search = search
  }

  const { data, metadata } = await getProducts(queryParams)

  return (
    <div>
      <AdminProductList products={data} />
      <Paginator page={pageNumber} totalPages={metadata.totalPages} />
    </div>
  )
}
