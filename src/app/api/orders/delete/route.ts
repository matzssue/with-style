import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request: NextRequest) {
  try {
    const { orderId }: { orderId: string } = await request.json()

    const deleteOrder = await prisma.order.delete({
      where: { id: orderId },
    })

    return NextResponse.json('Success')
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
