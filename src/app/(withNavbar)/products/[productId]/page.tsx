import { getProduct } from '@/data/products';
import prisma from '@/lib/prisma';

import { Heart, ShoppingBag } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

import { ImageMagnifier } from '@/components/ImageMagnifier/ImageMagnifier';
import { SelectSize } from '@/components/Select/SelectSize';

export async function generateStaticParams() {
  const products = await prisma.product.findMany();
  return products.map((product) => ({
    productId: product.id,
  }));
}

export default async function ProductPage({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await getProduct(productId);
  if (!product) return <div>error</div>;
  return (
    <section className='flex w-full items-center justify-center  p-5'>
      <div className=' flex w-1/2 justify-center gap-12 bg-neutral-100 p-5'>
        <ImageMagnifier altImage={product.name} imageUrl={product.imgUrl} />

        <div className='flex  w-full flex-col gap-10'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold text-secondary'>
              {product.name}
            </h1>
            <p className='italic'>{product.type}</p>
            <p>Price: {product.price} $</p>
          </div>
          <div className='flex flex-col gap-2'>
            <SelectSize />

            <Button>
              Add product to Bag
              <span className='ml-5'>
                <ShoppingBag />
              </span>
            </Button>
            <Button>
              Add to wishlist
              <span className='ml-5'>
                <Heart />
              </span>
            </Button>
          </div>
          <div>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Delivery Price</AccordionTrigger>
                <AccordionContent>
                  Enjoy flexible and free deliveries with us! Orders above 30$
                  are free of charge. Shop hassle-free and get your items
                  delivered quickly, tailored to your needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Delivery Time</AccordionTrigger>
                <AccordionContent>
                  We guarantee delivery within 1-3 days from placing the order
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>Free return within 30 days</AccordionTrigger>
                <AccordionContent>
                  Take advantage of our 30-day free return option! Shop
                  confidently, knowing you can return your items at no
                  additional cost
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}