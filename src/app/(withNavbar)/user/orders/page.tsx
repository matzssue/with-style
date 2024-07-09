import { currentUser } from '@/lib/auth'
import { Paginator } from '../../(components)/Paginator'
import { OrdersList } from './(components)/OrdersList'
import { getOrders } from '@/actions/get-orders'
import { OrdersData } from '@/types/orders'

type WishlistSearchParams = {
  page: string
}

export default async function Orders({
  searchParams,
}: {
  searchParams: WishlistSearchParams
}) {
  const user = await currentUser()
  const pageNumber = Number(searchParams.page || 1)
  if (!user) return

  const { data, metadata } = await getOrders(user.id, pageNumber)

  return (
    <section className='mx-[10%]'>
      <h1 className='py-5 text-center text-3xl'>You'r orders</h1>
      <OrdersList ordersData={data} />
      <div className='flex w-full items-center'>
        <Paginator page={pageNumber} totalPages={metadata.totalPages} />
      </div>
    </section>
  )
}