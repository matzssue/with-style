import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productId } = body

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
    return NextResponse.error()
  }
}
