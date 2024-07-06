import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { ITEMS_PER_PAGE } from '@/constants/pages'
import { OrderData, OrdersData } from '@/types/orders'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')
    const userId = searchParams.get('userId')
    const pageNumber = Number(page) || 1
    const skip = (pageNumber - 1) * ITEMS_PER_PAGE

    if (!userId) {
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
        userId: userId,
      },
      include: { products: { include: { product: true } } },
    })

    const count = await prisma.order.count({
      where: {
        userId: userId,
      },
    })

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)

    const ordersMapped: OrderData[] = orders.map((order) => {
      return {
        orderId: order.id,
        totalPrice: order.totalPrice,
        totalItems: order.totalItems,
        products: order.products.map(({ product }) => {
          return {
            productId: product.id,
            name: product.name,
            price: product.price,
            type: product.type,
            category: product.category,
          }
        }),
      }
    })

    const ordersData = {
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
