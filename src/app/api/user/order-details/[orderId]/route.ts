import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { auth } from '@/auth'
import { OrderData } from '@/types/orders'
import { currentRole, currentUser } from '@/lib/auth/auth'

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

    const orderMapped: OrderData = {
      orderId: order.id,
      totalPrice: order.totalPrice,
      totalItems: order.totalItems,
      createdAt: order.createdAt,
      orderNumber: order.orderNumber,
      shippingName: order.shippingName,
      address: `${order.zip} ${order.city}, ${order.street} ${order.number}`,
      paid: order.paid,
      products: order.products.map((productInStore) => {
        return {
          productId: productInStore.product.id,
          name: productInStore.product.name,
          price: productInStore.product.price,
          type: productInStore.product.type,
          category: productInStore.product.category,
          size: productInStore.size,
          imgUrl: productInStore.product.imgUrl,
        }
      }),
    }

    return NextResponse.json(orderMapped)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
