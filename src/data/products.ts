import prisma from '@/lib/prisma';

export const getProduct = async (id: string) => {
  try {
    console.log('id', id);
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
  } catch (err) {
    throw new Error('Error getting product');
  }
};

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (err) {
    throw new Error('Error getting products');
  }
};
