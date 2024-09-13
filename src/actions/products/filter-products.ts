'use server'

import { redirect } from 'next/navigation'

type Filters = {
  size?: string
  maxPrice?: string | null
  minPrice?: string | null
  sortByPrice?: string | null
}

type QueryParams = {
  maxPrice?: string
  minPrice?: string
  size?: string
  sortByPrice?: string
}

export const updateFilters = async (filters: Filters, currentPath: string) => {
  const queryParams: QueryParams = {}
  const { maxPrice, minPrice, size, sortByPrice } = filters

  if (minPrice) queryParams.minPrice = minPrice.toString()
  if (maxPrice) queryParams.maxPrice = maxPrice.toString()
  if (size) queryParams.size = filters.size
  if (sortByPrice) queryParams.sortByPrice = sortByPrice

  if (filters) {
    const params = new URLSearchParams(queryParams)
    redirect(`${currentPath}?${params}`)
  }
  redirect(currentPath)
}
