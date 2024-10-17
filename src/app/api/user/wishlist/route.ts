import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Product } from '@prisma/client'
import { WISHLISTED_ITEMS_PER_PAGE } from '@/constants/pages'
import { WishlistData } from '@/types/wishlist'
import { currentUser } from '@/lib/auth/auth'

export type UserWishlist = {
  wishlist: Product[]
}

export async function GET(request: NextRequest) {
  const user = await currentUser()
  const searchParams = request.nextUrl.searchParams
  const userId = user?.id
  const page = searchParams.get('page') as string

  const pageNumber = Number(page) || 1
  const skip = (pageNumber - 1) * WISHLISTED_ITEMS_PER_PAGE

  try {
    const userWihlist = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        wishlist: {
          skip: skip,
          take: WISHLISTED_ITEMS_PER_PAGE,
        },
      },
    })

    const productCount = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        wishlist: {
          select: { _count: true },
        },
      },
    })

    const totalItems = productCount?.wishlist.length || 0
    const totalPages = Math.ceil(totalItems / WISHLISTED_ITEMS_PER_PAGE)

    const wishlistData: WishlistData = {
      data: userWihlist?.wishlist || [],
      metadata: {
        totalPages,
      },
    }

    return NextResponse.json(wishlistData)
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
