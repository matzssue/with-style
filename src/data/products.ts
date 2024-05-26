import prisma from '@/lib/prisma'
import { ProductCategory, ProductType } from '@prisma/client'

export const getProduct = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } })
    return product
  } catch (err) {
    throw new Error('Error getting product')
  }
}

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany()
    return products
  } catch (err) {
    throw new Error('Error getting products')
  }
}

export const getProductsByCategory = async (category: ProductCategory) => {
  try {
    const categoryUppercase = category.toUpperCase() as ProductCategory

    const products = await prisma.product.findMany({
      where: { category: categoryUppercase },
    })
    return products
  } catch (err) {
    throw new Error('Error getting products')
  }
}
export const getProductsByType = async (type: ProductType) => {
  try {
    const categoryUppercase = type.toUpperCase() as ProductType
    const products = await prisma.product.findMany({
      where: { type: categoryUppercase },
    })

    return products
  } catch {
    throw new Error('Error getting products')
  }
}

export const getProductsBySubcategory = async (
  subcategory: string,
  limit: number
) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        subcategory: subcategory,
      },
      take: limit,
    })
    return products
  } catch (err) {
    throw new Error('Error getting products')
  }
}
