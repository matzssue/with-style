import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { currentRole } from '@/lib/auth/auth'

export async function GET() {
  try {
    // const role = await currentRole()
    // if (role === 'ADMIN') {
    const numberOfOrders = await prisma.order.count()
    const numberOfUsers = await prisma.user.count()
    const numberOfProducts = await prisma.product.count()

    const statisticsData = { numberOfOrders, numberOfProducts, numberOfUsers }

    return NextResponse.json(statisticsData)
    // }

    // return new NextResponse(null, { status: 403 })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
