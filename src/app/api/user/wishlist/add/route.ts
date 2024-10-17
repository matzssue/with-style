import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { currentUser } from '@/lib/auth/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()

    const body = await request.json()
    const { productId } = body

    const addToWishlist = await prisma.user.update({
      where: { id: user?.id },
      data: {
        wishlist: {
          connect: { id: productId },
        },
      },
    })

    if (!addToWishlist) {
      return NextResponse.json(
        { error: 'Failed to add to wishlist' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: 'Product added to wishlist' })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
