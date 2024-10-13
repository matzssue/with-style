import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productIds = searchParams.get('productIds')

    const idsArray = (productIds as string).split(',')

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: idsArray,
        },
      },
    })
    if (products.length === 0) {
      return NextResponse.json(
        { error: 'No products found for the provided IDs' },
        { status: 404 }
      )
    }
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
