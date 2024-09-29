import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import { ITEMS_PER_PAGE } from '@/constants/pages'
import { ProductsData } from '@/types/products'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')
    const limit = Number(searchParams.get('limit'))
    const subcategory = searchParams.get('subcategory')
    const pageNumber = Number(page) || 1
    const skip = (pageNumber - 1) * ITEMS_PER_PAGE

    const products = await prisma.product.findMany({
      where: {
        subcategory: subcategory,
      },
      take: limit,
      skip: skip,
    })

    const count = await prisma.product.count({
      where: {
        subcategory: subcategory,
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
