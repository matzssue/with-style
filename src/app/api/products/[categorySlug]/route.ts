import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ProductCategory, Size } from '@prisma/client'
import { ITEMS_PER_PAGE } from '@/constants/pages'
import { ProductsData } from '@/types/products'
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categories = searchParams.get('category')
    const size = searchParams.get('size') as Size
    const page = searchParams.get('page')
    const minPrice = searchParams.get('minPrice') as string
    const maxPrice = searchParams.get('maxPrice') as string

    const categoryToUpper = categories?.toUpperCase() as ProductCategory
    const pageNumber = Number(page)
    const skip = (pageNumber - 1) * ITEMS_PER_PAGE

    const products = await prisma.product.findMany({
      take: ITEMS_PER_PAGE,
      skip: skip,
      where: {
        category: categoryToUpper,
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
    console.log(error)
    return NextResponse.error()
  }
}
