import { Paginator } from '../../../../components/Paginator/Paginator'
import { OrdersList } from './(components)/OrdersList'

import { getOrders } from '@/data/orders/get-orders'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading/Loading'

type WishlistSearchParams = {
  page: string
}

export default async function Orders({
  searchParams,
}: {
  searchParams: WishlistSearchParams
}) {
  const pageNumber = Number(searchParams.page || 1)

  const { data, metadata } = await getOrders(pageNumber)

  return (
    <section className='mx-[10%]'>
      <h1 className='py-5 text-center text-3xl'>You&apos;r orders</h1>
      <Suspense fallback={<Loading />}>
        <OrdersList ordersData={data} />
      </Suspense>
      <div className='flex w-full items-center'>
        <Paginator page={pageNumber} totalPages={metadata.totalPages} />
      </div>
    </section>
  )
}
