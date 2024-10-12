import { getCookies } from '@/lib/auth/sessionCookies'
import { ProductsData, ProductsQueryParams } from '@/types/products'

export const getProducts = async (filters?: ProductsQueryParams) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/products/${filters?.category}/${filters?.type}`
  )

  url.search = new URLSearchParams(filters).toString()

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: getCookies(),
    },
    cache: 'no-cache',
  })

  if (response.status !== 200) {
    throw new Error('Failed to fetch products')
  }

  const data: ProductsData = await response.json()

  return data
}

export const getProductsBySubcategory = async (
  subcategory: string,
  limit: number
) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/products/subcategory`
  )

  const searchParams = {
    subcategory,
    limit: limit.toString(),
  }

  url.search = new URLSearchParams(searchParams).toString()

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status !== 200) {
    throw new Error('Failed to fetch products')
  }

  const data: ProductsData = await response.json()
  return data
}

export const getProductsByCategory = async (
  category: string,
  limit: number
) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/products/category`
  )

  const searchParams = {
    category,
    limit: limit.toString(),
  }
  url.search = new URLSearchParams(searchParams).toString()
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status !== 200) {
    throw new Error('Failed to fetch products')
  }

  const data: ProductsData = await response.json()
  return data
}
