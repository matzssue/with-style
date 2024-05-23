import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    // console.log('searchParams', searchParams);
    const categories = searchParams.get('category')
    const size = searchParams.get('size')
    const type = searchParams.get('type')
    console.log('size', size)
    const categoryToUpper = categories?.toUpperCase()
    console.log(categories, 'categories')
    const products = await prisma.product.findMany({
      where: {
        category: categoryToUpper,
        ...(size !== null && { size: { has: size } }),
      },
    })
    console.log(products)
    return NextResponse.json(products)
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
