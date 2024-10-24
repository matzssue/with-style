import { fetchData } from '@/lib/helplers/fetchData'
import { publicRoutes } from '@/routes'
import { ProductsData, ProductsQueryParams } from '@/types/products'
import { headers } from 'next/headers'

export const getProducts = async (
  filters?: ProductsQueryParams
): Promise<ProductsData> => {
  headers()
  const products = await fetchData<ProductsData>(
    `api/${publicRoutes.products}/${filters?.category}/${filters?.type}`,
    {
      queryParams: filters,
    }
  )

  return products
}

export const getProductsBySubcategory = async (
  subcategory: string,
  limit: number
): Promise<ProductsData> => {
  const searchParams = {
    subcategory,
    limit: limit.toString(),
  }

  const products = await fetchData<ProductsData>(
    `api/${publicRoutes.products}/subcategory`,
    {
      queryParams: searchParams,
    }
  )

  return products
}

export const getProductsByCategory = async (
  category: string,
  limit: number
) => {
  const searchParams = {
    category,
    limit: limit.toString(),
  }
  const products = await fetchData<ProductsData>(
    `api/${publicRoutes.products}/category`,
    {
      queryParams: searchParams,
    }
  )

  return products
}
