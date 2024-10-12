import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { currentUser } from '@/lib/auth/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()

    const body = await request.json()
    const { productId } = body

    const updated = await prisma.user.update({
      where: { id: user?.id },
      data: {
        wishlist: {
          connect: { id: productId },
        },
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
