import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { OrderData } from '@/types/orders'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get('orderId')

    if (!orderId) return

    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: { products: { include: { product: true } } },
    })

    if (!order) {
      return
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
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
