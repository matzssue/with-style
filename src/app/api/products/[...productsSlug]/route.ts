import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ProductCategory, ProductType, Size } from '@prisma/client'
import { ProductsData } from '@/types/products'
import { ITEMS_PER_PAGE } from '@/constants/pages'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const categories = searchParams.get('category')
    const type = searchParams.get('type')?.toUpperCase() as ProductType
    const size = searchParams.get('size') as Size
    const minPrice = searchParams.get('minPrice') as string
    const page = searchParams.get('page')
    const maxPrice = searchParams.get('maxPrice') as string
    const sortByPrice = searchParams.get('sortByPrice') as 'asc' | 'desc' | null
    const categoryToUpper = categories?.toUpperCase() as ProductCategory
    const pageNumber = Number(page) || 1
    const skip = (pageNumber - 1) * ITEMS_PER_PAGE

    const products = await prisma.product.findMany({
      ...(sortByPrice !== null && { orderBy: [{ price: sortByPrice }] }),
      take: ITEMS_PER_PAGE,
      skip: skip,
      where: {
        ...(categoryToUpper !== null && { category: categoryToUpper }),
        ...(type !== null && { type: type }),
        ...(size !== null && { size: { has: size } }),
        ...(maxPrice &&
          minPrice !== null && {
            price: {
              gte: +minPrice,
              lte: +maxPrice,
            },
          }),
      },
    })

    const count = await prisma.product.count({
      where: {
        category: categoryToUpper,
        type: type,
        ...(size !== null && { size: { has: size } }),
        ...(maxPrice &&
          minPrice !== null && {
            price: {
              gte: +minPrice,
              lte: +maxPrice,
            },
          }),
      },
    })

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)

    const productsData: ProductsData = {
      data: products,
      metadata: {
        totalPages,
      },
    }
    return NextResponse.json(productsData)
  } catch (error) {
    return NextResponse.error()
  }
}
