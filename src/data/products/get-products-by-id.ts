import { fetchData } from '@/lib/helplers/fetchData'
import { publicRoutes } from '@/routes'
import { Product } from '@prisma/client'
import { headers } from 'next/headers'

export const getProductsById = async (
  productIds: string[]
): Promise<Product[]> => {
  const querySearch = {
    productIds: productIds.join(','),
  }

  const product = await fetchData<Product[]>(
    `api/${publicRoutes.products}/id`,
    {
      queryParams: querySearch,
      headers: headers(),
    }
  )

  return product
}
