import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { currentUser } from '@/lib/auth/auth'

export async function DELETE(request: NextRequest) {
  try {
    const user = await currentUser()

    const userId = user?.id
    const body = await request.json()
    const { productId } = body

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Missing user or product' },
        { status: 400 }
      )
    }

    const removeFromWishlist = await prisma.user.update({
      where: { id: userId },
      data: {
        wishlist: {
          disconnect: { id: productId },
        },
      },
    })
    if (!removeFromWishlist) {
      return NextResponse.json(
        { error: 'Failed to remove from wishlist' },
        { status: 500 }
      )
    }
    return NextResponse.json({ success: 'Product removed from wishlist' })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
