import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        {
          error: 'Bad Request: Missing product id',
        },
        { status: 400 }
      )
    }

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
