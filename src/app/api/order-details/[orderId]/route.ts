import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { auth } from '@/auth'
import { OrderData } from '@/types/orders'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    const userRole = session?.user.role
    const userId = session?.user.id
    const searchParams = req.nextUrl.searchParams
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: { products: { include: { product: true } } },
    })

    if (userRole !== 'ADMIN' && userId !== order?.userId) {
      return NextResponse.json(
        { error: `Sorry you'r not allowed to see this page` },
        { status: 403 }
      )
    }

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
