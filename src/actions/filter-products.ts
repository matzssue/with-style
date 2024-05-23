'use server'

import { redirect, usePathname } from 'next/navigation'

type Filters = {
  size: string
  price: number[]
}

export const updateFilters = async (filters: Filters, currentPath: string) => {
  console.log('filters', filters)
  if (filters) {
    const params = new URLSearchParams({
      size: filters.size,
      minPrice: filters.price[0].toString(),
      maxPrice: filters.price[1].toString(),
    })
    redirect(`${currentPath}?${params}`)
  }
  redirect('/products/man')
}
