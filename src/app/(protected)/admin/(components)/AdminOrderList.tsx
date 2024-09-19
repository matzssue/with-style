'use client'

import { OrdersList } from '@/app/(protected)/user/orders/(components)/OrdersList'
import { SearchInput } from '@/components/Searchbar/SearchInput'
import { Input } from '@/components/ui/input'
import { useSelectList } from '@/hooks/use-select-list'
import { OrderData } from '@/types/orders'
import { ChangeEvent } from 'react'

export const AdminOrderList = ({ orders }: { orders: OrderData[] }) => {
  const filterByCategory = (item: OrderData, searchValue: string) => {
    return item.orderNumber
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  }

  const { listData, searchValueHandler, searchValue } =
    useSelectList<OrderData>(orders, filterByCategory)

  return (
    <>
      <div>
        <SearchInput
          placeholder='search by order number'
          title='Search order'
          setSearchValue={searchValueHandler}
          value={searchValue}
        />
      </div>
      <OrdersList ordersData={listData} />
    </>
  )
}
