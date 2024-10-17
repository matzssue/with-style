import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { OrderData } from '@/types/orders'
import { currentUser } from '@/lib/auth/auth'
import { mapOrders } from '@/lib/helplers/mapOrders'

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser()
    const searchParams = req.nextUrl.searchParams
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: user?.id },
      include: { products: { include: { product: true } } },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const orderMapped: OrderData = mapOrders(order)

    return NextResponse.json(orderMapped)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
