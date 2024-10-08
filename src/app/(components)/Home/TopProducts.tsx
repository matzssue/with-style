import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { getProductsBySubcategory } from '@/data/products/get-products'
import TopProduct from './TopProduct'

export const TopProducts = async () => {
  const { data: topProducts } = await getProductsBySubcategory('TOP', 9)

  return (
    <section className='flex w-5/6 flex-col items-center justify-center pb-10 max-md:w-4/6'>
      <h1 className='py-5 text-2xl font-bold'>Top products</h1>
      <Carousel className='w-full max-w-screen-xl '>
        <CarouselContent className='-ml-1'>
          {topProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className='md:basis-1/2 lg:basis-1/4'
            >
              <TopProduct {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
