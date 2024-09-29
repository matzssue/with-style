'use server'

import { redirect } from 'next/navigation'

type Filters = {
  size?: string | null
  maxPrice?: string | null
  minPrice?: string | null
  sortByPrice?: string | null
  promotions?: string | null
  subcategory?: string | null
}

type QueryParams = {
  maxPrice?: string
  minPrice?: string
  size?: string
  sortByPrice?: string
  promotions?: string
  subcategory?: string
}

export const updateFilters = async (filters: Filters, currentPath: string) => {
  const queryParams: QueryParams = {}

  const { maxPrice, minPrice, promotions, size, sortByPrice, subcategory } =
    filters

  if (minPrice) queryParams.minPrice = minPrice.toString()
  if (maxPrice) queryParams.maxPrice = maxPrice.toString()
  if (size) queryParams.size = size
  if (sortByPrice) queryParams.sortByPrice = sortByPrice
  if (promotions) queryParams.promotions = 'true'
  if (subcategory) queryParams.subcategory = subcategory
  if (filters) {
    const params = new URLSearchParams(queryParams)
    redirect(`${currentPath}?${params}`)
  }
  redirect(currentPath)
}
