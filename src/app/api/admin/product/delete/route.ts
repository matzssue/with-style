import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request: NextRequest) {
  try {
    const { productId }: { productId: string } = await request.json()

    await prisma.product.delete({
      where: { id: productId },
    })

    return NextResponse.json({ success: 'Product deleted' })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
