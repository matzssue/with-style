import { Product } from '@prisma/client'

export const getProductsById = async (productIds: string[]) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/products/id`
  )

  const querySearch = {
    productIds: productIds.join(','),
  }

  url.search = new URLSearchParams(querySearch).toString()

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status !== 200) {
    throw new Error('Failed to fetch products')
  }

  const data: Product[] = await response.json()

  return data
}
