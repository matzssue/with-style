import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { ITEMS_PER_PAGE } from '@/constants/pages'
import { OrderData, OrdersData } from '@/types/orders'
import { currentUser } from '@/lib/auth/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()

    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')
    const pageNumber = Number(page) || 1
    const skip = (pageNumber - 1) * ITEMS_PER_PAGE

    if (!user?.id) {
      return NextResponse.json(
        {
          error: 'Bad Request: Missing userId',
        },
        { status: 400 }
      )
    }

    const orders = await prisma.order.findMany({
      take: ITEMS_PER_PAGE,
      skip: skip,
      where: {
        userId: user?.id,
      },

      include: { products: { include: { product: true } } },
    })

    const count = await prisma.order.count({
      where: {
        userId: user?.id,
      },
    })

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)

    const ordersMapped: OrderData[] = orders.map((order) => {
      return {
        orderId: order.id,
        totalPrice: order.totalPrice,
        totalItems: order.totalItems,
        createdAt: order.createdAt,
        orderNumber: order.orderNumber,
        shippingName: order.shippingName,
        paid: order.paid,
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
    })

    const ordersData: OrdersData = {
      data: ordersMapped || [],
      metadata: {
        totalPages,
      },
    }

    return NextResponse.json(ordersData)
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}