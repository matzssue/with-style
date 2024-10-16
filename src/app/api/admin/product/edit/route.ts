import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { productSchema } from '@/lib/schemas/product-schema'

export async function PUT(request: NextRequest) {
  try {
    const productData = await request.json()
    const validateProduct = productSchema.safeParse(productData)

    if (!productData) {
      return NextResponse.json(
        {
          error: 'Bad Request: Missing product',
        },
        { status: 400 }
      )
    }

    if (validateProduct.error) {
      return NextResponse.json(
        {
          error: validateProduct.error.errors.map((e) => e.message).join(', '),
        },
        { status: 400 }
      )
    }

    const product = await prisma.product.update({
      where: { id: productData.id },
      data: productData,
    })
    if (!product) {
      return NextResponse.json(
        { error: 'Failed to edit product' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: 'Product sucessfully edited' })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
