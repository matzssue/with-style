import { Paginator } from '@/components/Paginator/Paginator'

import { getAllOrders } from '@/data/orders/get-all-orders'

import { AdminOrderList } from '../(components)/AdminOrderList'

type OrdersSearchParams = {
  page?: string
  search?: string
}

export default async function OrdersAdmin({
  searchParams,
}: {
  searchParams: OrdersSearchParams
}) {
  const queryParams: OrdersSearchParams = {}
  const page = searchParams.page
  const { search } = searchParams

  if (page) {
    queryParams.page = page
  }
  if (search) {
    queryParams.search = search
  }

  const { data: orders, metadata } = await getAllOrders(queryParams)

  return (
    <div>
      <AdminOrderList orders={orders} />
      <Paginator page={page} totalPages={metadata.totalPages} />
    </div>
  )
}
