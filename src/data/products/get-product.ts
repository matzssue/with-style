import { fetchData } from '@/lib/helplers/fetchData'
import { publicRoutes } from '@/routes'
import { Product } from '@prisma/client'
import { headers } from 'next/headers'

export const getProduct = async (id: string): Promise<Product> => {
  const querySearch = {
    productId: id,
  }

  const product = await fetchData<Product>(`api/${publicRoutes.product}`, {
    queryParams: querySearch,
  })

  return product
}
