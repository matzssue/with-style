import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'

export type UserWishlist = {
  wishlist: Product[]
} | null

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId') as string

  try {
    const userWihlist: UserWishlist = await prisma.user.findUnique({
      where: { id: userId },
      include: { wishlist: true },
    })

    return NextResponse.json(userWihlist?.wishlist, {
      headers: {
        'Cache-control': 'no-store',
      },
    })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
