import { Paginator } from '@/components/Paginator/Paginator'

import { getAllOrders } from '@/data/orders/get-all-orders'

import { AdminOrderList } from '../(components)/AdminOrderList'

type OrdersSearchParams = {
  page: string
}

export default async function OrdersAdmin({
  searchParams,
}: {
  searchParams: OrdersSearchParams
}) {
  const pageNumber = Number(searchParams.page || 1)
  const { data: orders, metadata } = await getAllOrders(pageNumber)

  return (
    <div>
      <AdminOrderList orders={orders} />
      <Paginator page={pageNumber} totalPages={metadata.totalPages} />
    </div>
  )
}
