'use client'

import { ProductList } from '@/app/(withNavbar)/products/(components)/ProductsList'
import { Paginator } from '@/components/Paginator/Paginator'
import { getProducts } from '@/data/products/get-products'
import { AdminProductList } from '../(components)/AdminProductList'
import { OrdersList } from '@/app/(withNavbar)/user/orders/(components)/OrdersList'
import { getOrders } from '@/data/orders/get-orders'
import { getAllOrders } from '@/data/orders/get-all-orders'
import { useSelectList } from '@/hooks/use-select-list'
import { Order } from '@prisma/client'
import { OrderData, OrdersData } from '@/types/orders'
import { ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
// import { useEffect, useState } from 'react'

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
  console.log('orders', orders)
  const filterByCategory = (item: OrderData, searchValue: string) => {
    return item.orderNumber
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  }
  if (!orders) return
  const { listData, searchValueHandler, searchValue } =
    useSelectList<OrderData>(orders, filterByCategory)

  return (
    <div>
      <div>
        <label>Search order</label>
        <Input
          type='search'
          value={searchValue ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            searchValueHandler(e.target.value)
          }
          id='searchInput'
          placeholder='search '
        />
      </div>
      <OrdersList ordersData={listData} />
      <Paginator page={pageNumber} totalPages={metadata.totalPages} />
    </div>
  )
}
