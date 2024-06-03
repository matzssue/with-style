import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { useSession } from 'next-auth/react'
import { auth } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productId } = body

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        wishlist: {
          connect: { id: productId },
        },
      },
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
