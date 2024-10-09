'use client'

import { OrdersList } from '@/app/(protected)/user/orders/(components)/OrdersList'

import { Input } from '@/components/ui/input'

import { useSearch } from '@/hooks/use-search'

import { adminRoutes } from '@/routes'
import { OrderData } from '@/types/orders'

export const AdminOrderList = ({ orders }: { orders: OrderData[] }) => {
  const { handleSearch } = useSearch(adminRoutes.orders)

  return (
    <>
      <div className={`flex  gap-3`}>
        <label className='text-nowrap text-2xl font-bold'>
          Search by order number
        </label>
        <Input
          type='number'
          step={1}
          id='searchInput'
          placeholder={''}
          style={{ maxWidth: '300px' }}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              handleSearch(e.target.value)
            }
          }}
        />
      </div>
      <OrdersList ordersData={orders} />
    </>
  )
}
