import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '@/components/Cards/ProductCard';

export const TopProducts = () => {
  return (
    <section className='pb-10'>
      <h1 className='text-2xl font-bold'>Top products</h1>
      <Carousel className='w-full max-w-screen-xl '>
        <CarouselContent className='-ml-1'>
          {Array.from({ length: 15 }).map((_, index) => (
            <CarouselItem
              key={index}
              className='pl-1 md:basis-1/2 lg:basis-1/4'
            >
              <div className='p-1'>
                <ProductCard></ProductCard>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
