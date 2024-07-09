import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { AddOrderData } from '@/types/products'

import { User } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const { orderData, user }: { orderData: AddOrderData; user: User } =
      await request.json()

    const data = await prisma.order.create({
      data: {
        userId: user.id,
        totalItems: orderData.productsData.totalItems,
        totalPrice: orderData.amount,
        city: orderData.city,
        phoneNumber: orderData.phoneNumber,
        shippingName: `${orderData.name} ${orderData.surname}`,
        street: orderData.street,
        number: orderData.number,
        zip: orderData.zip,
        products: {
          create: orderData.productsData.cart.map((product) => ({
            size: product.size,
            product: {
              connect: { id: product.id },
            },
          })),
        },
      },
      include: {
        products: true,
      },
    })

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
