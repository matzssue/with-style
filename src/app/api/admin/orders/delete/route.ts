import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request: NextRequest) {
  try {
    const { orderId }: { orderId: string } = await request.json()

    await prisma.order.delete({
      where: { id: orderId },
    })

    return NextResponse.json({ success: 'sucessfully removed order' })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
