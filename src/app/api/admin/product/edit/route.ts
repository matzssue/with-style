import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const productData = await request.json()

    if (!productData) {
      return NextResponse.json(
        {
          error: 'Bad Request: Missing product',
        },
        { status: 400 }
      )
    }

    const product = await prisma.product.update({
      where: { id: productData.id },
      data: productData,
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
