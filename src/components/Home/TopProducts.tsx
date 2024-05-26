import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProductCard from '@/components/Cards/ProductCard'
import { getProductsBySubcategory } from '@/data/products'

export const TopProducts = async () => {
  const topProducts = await getProductsBySubcategory('TOP', 9)

  return (
    <section className='pb-10'>
      <h1 className='py-5 text-2xl font-bold'>Top products</h1>
      <Carousel className='w-full max-w-screen-xl '>
        <CarouselContent className='-ml-1'>
          {topProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className='pl-1 md:basis-1/2 lg:basis-1/4'
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
