import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ProductCategory, Size } from '@prisma/client'
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categories = searchParams.get('category')
    const size = searchParams.get('size') as Size

    const minPrice = searchParams.get('minPrice') as string
    const maxPrice = searchParams.get('maxPrice') as string

    const categoryToUpper = categories?.toUpperCase() as ProductCategory

    const products = await prisma.product.findMany({
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

    return NextResponse.json(products)
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
