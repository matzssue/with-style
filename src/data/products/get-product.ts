import prisma from '@/lib/prisma'

export const getProduct = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } })
    return product
  } catch (err) {
    throw new Error('Error getting product')
  }
}
