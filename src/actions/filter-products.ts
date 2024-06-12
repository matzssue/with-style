'use server'

import { Size } from '@prisma/client'
import { redirect, usePathname } from 'next/navigation'

type Filters = {
  size: string
  price: number[]
}

type QueryParams = {
  maxPrice: string
  minPrice: string
  size?: string
}

export const updateFilters = async (filters: Filters, currentPath: string) => {
  const queryParams: QueryParams = {
    minPrice: filters.price[0].toString(),
    maxPrice: filters.price[1].toString(),
  }
  if (filters.size) queryParams.size = filters.size

  if (filters) {
    const params = new URLSearchParams(queryParams)
    redirect(`${currentPath}?${params}`)
  }
  redirect(currentPath)
}
