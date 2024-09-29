import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { ITEMS_PER_PAGE } from '@/constants/pages'
import { ProductsData } from '@/types/products'

export async function GET(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, limit } = body

    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')

    const pageNumber = Number(page) || 1
    const skip = (pageNumber - 1) * ITEMS_PER_PAGE

    const products = await prisma.product.findMany({
      where: {
        category: category,
      },
      take: limit,
      skip: skip,
    })

    const count = await prisma.product.count({
      where: {
        category: category,
      },
    })

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)

    const productsData: ProductsData = {
      data: products || [],
      metadata: {
        totalPages,
      },
    }

    return NextResponse.json(productsData)
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
