import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categories = searchParams.get('category')
    const size = searchParams.get('size')
    const type = searchParams.get('type')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const categoryToUpper = categories?.toUpperCase()

    const products = await prisma.product.findMany({
      where: {
        category: categoryToUpper,
        ...(type !== null && { type: type.toUpperCase() }),
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
