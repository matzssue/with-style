import prisma from '@/lib/prisma'

import { Accordion } from '@/components/ui/accordion'

import { ImageMagnifier } from '@/components/ImageMagnifier/ImageMagnifier'

import { getProduct } from '@/data/products/get-product'
import { ProductPrice } from '@/components/ProductPrice/ProductPrice'
import { ProductFormButtons } from './(components)/ProductFormButtons'
import { deliveryInformations } from '@/constants/informations'
import { CustomAccordionItem } from '@/components/Accordion/CustomAccordionItem'
import { Loading } from '@/components/Loading/Loading'
import { Suspense } from 'react'

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
  const product = await getProduct(productId)

  if (!product) return <div>Error while loading a product.</div>

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

            <ProductPrice
              price={product.price}
              discountPercentage={product.discountPercentage}
            />
          </div>
          <Suspense fallback={<Loading />}>
            <ProductFormButtons product={product} />
          </Suspense>
          <div>
            <Accordion type='single' collapsible className='w-full'>
              {deliveryInformations.map((information) => (
                <CustomAccordionItem key={information.value} {...information} />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
