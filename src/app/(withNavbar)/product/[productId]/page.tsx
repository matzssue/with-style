import prisma from '@/lib/prisma'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { ImageMagnifier } from '@/components/ImageMagnifier/ImageMagnifier'

import { AddProductForm } from './(components)/AddProductForm'

import { WishlistToggleButton } from '../../../(protected)/user/(components)/WishlistToggleButton'
import { getWishlistProductsId } from '@/data/wishlist/get-wishlist'
import { auth } from '@/auth'
import { getProduct } from '@/data/products/get-product'
import { calculatePriceWithDiscount } from '@/lib/helplers/calculatePriceWithDiscount'

export async function generateStaticParams() {
  const products = await prisma.product.findMany()
  return products.map((product) => ({
    productId: product.id,
  }))
}

export default async function ProductPage({
  params: { productId },
}: {
  params: { productId: string }
}) {
  const session = await auth()
  const userId = session?.user.id
  const product = await getProduct(productId)
  const userWishlist = await getWishlistProductsId(userId)
  if (!product) return <div>Error while loading a product.</div>

  const discountPrice = calculatePriceWithDiscount(
    product.price,
    product.discountPercentage
  )

  return (
    <section className='flex w-full items-center justify-center  p-5'>
      <div className=' flex w-1/2 min-w-[700px] justify-center  gap-12 bg-neutral-100 p-5 max-lg:w-full max-md:min-w-[100px] max-md:flex-col'>
        <div>
          <ImageMagnifier altImage={product.name} imageUrl={product.imgUrl} />
        </div>

        <div className='flex  w-full flex-col gap-10'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold text-secondary'>
              {product.name}
            </h1>
            <p className='italic'>{product.type}</p>

            <p>
              Price:{' '}
              <span
                className={`font-semibold ${discountPrice ? 'line-through' : ''}`}
              >
                {product.price}$
              </span>{' '}
              {product.discountPercentage && (
                <span className='font-semibold text-red-500'>
                  {' '}
                  -{product.discountPercentage}% {discountPrice}$
                </span>
              )}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <AddProductForm product={product} />
            <WishlistToggleButton
              wishlisted={userWishlist}
              withText
              productId={product.id}
            />
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
  )
}
