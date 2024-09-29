import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const uniqueSubcategories = await prisma.product.findMany({
      where: {
        subcategory: {
          not: null,
        },
      },
      distinct: ['subcategory'],
      select: {
        subcategory: true,
      },
    })
    const subcategories = uniqueSubcategories.map((item) => item.subcategory)
    return NextResponse.json(subcategories)
  } catch (error) {
    return NextResponse.json(
      {
        error: `Internal Server Error: ${error}`,
      },
      { status: 500 }
    )
  }
}
