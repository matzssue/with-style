import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const numberOfOrders = await prisma.order.count()
    const numberOfUsers = await prisma.user.count()
    const numberOfProducts = await prisma.product.count()

    const statisticsData = [
      { title: 'Orders', quantity: numberOfOrders },
      { title: 'Users', quantity: numberOfUsers },
      { title: 'Products', quantity: numberOfProducts },
    ]

    return NextResponse.json(statisticsData)
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
