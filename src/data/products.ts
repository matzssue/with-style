import prisma from '@/lib/prisma';

export const getProduct = async (id: string) => {
  console.log('id', id);
  const product = await prisma.product.findUnique({ where: { id } });
  return product;
};

export const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};
