import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { productSchema } from '@/lib/schemas/product-schema'

export async function POST(request: NextRequest) {
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
    const validateProduct = productSchema.safeParse(productData)

    if (validateProduct.error) {
      return NextResponse.json(
        {
          error: validateProduct.error.errors.map((e) => e.message).join(', '),
        },
        { status: 400 }
      )
    }

    const createdProduct = await prisma.product.create({
      data: productData,
    })

    return NextResponse.json(createdProduct)
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
