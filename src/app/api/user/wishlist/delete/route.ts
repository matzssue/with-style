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

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        wishlist: {
          disconnect: { id: productId },
        },
      },
    })

    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
