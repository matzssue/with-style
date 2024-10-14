import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(request: NextRequest) {
  try {
    const { orderId, updateData } = await request.json()

    const status = updateData.paid

    if (!orderId) {
      return NextResponse.json(
        {
          error: 'Bad Request: Missing order',
        },
        { status: 400 }
      )
    }

    const product = await prisma.order.update({
      where: { id: orderId },
      data: {
        paid: status,
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
