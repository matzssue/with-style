import manNewProducts from '../../../public/images/man-new-products.jpg';
import womanNewProducts from '../../../public/images/woman-new-products.jpg';
import Image from 'next/image';
import { MotionCard } from '../Cards/MotionCard';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '@/components/Cards/ProductCard';
import summerOne from '../../../public/images/summer one.jpg';
import summerTwo from '../../../public/images/summer one.webp';
import summerThree from '../../../public/images/summer three.webp';

export const NewProducts = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <section className='flex w-full flex-col overflow-x-hidden'>
      <div className='flex justify-around'>
        <MotionCard index={1} key={1}>
          <div className='flex flex-col items-center justify-center gap-y-32 bg-[#e4ebed]'>
            <div className='flex flex-col items-center gap-y-5'>
              <p className='text-4xl font-bold text-primary'>
                New summer collection{' '}
              </p>
              <Link
                className=' before:ease relative  flex h-12 w-40 items-center justify-center overflow-hidden border border-secondary bg-secondary text-center text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-secondary hover:before:-translate-x-40'
                href={'#'}
              >
                <span>Checkout</span>
              </Link>
            </div>
            <div className='flex justify-center gap-8 p-6'>
              <div className='flex flex-col'>
                <Image height={400} alt='summer clothes' src={summerThree} />
                <p>New comfy dress</p>
                <p>166 $</p>
                <Link href={'#'}>Go to product</Link>
              </div>
              <div>
                <Image height={400} alt='summer clothes' src={summerOne} />
                <p>Elegance complet</p>
                <p>136 $</p>
                <Link href={'#'}>Go to product</Link>
              </div>
              <div>
                <Image height={400} alt='summer clothes' src={summerTwo} />
                <p>classic t-shirt</p>
                <p>44 $</p>
                <Link href={'#'}>Go to product</Link>
              </div>
            </div>
          </div>

          <Image src={manNewProducts} alt='man-model' width={700} />
        </MotionCard>
      </div>
      <MotionCard index={2} key={2}>
        <Image src={womanNewProducts} width={700} alt='woman-model' />
        <div className='flex flex-col items-center justify-center gap-y-32 bg-[#e7e6e0]'>
          <div className='flex flex-col items-center gap-y-5'>
            <p className='text-4xl font-bold text-primary'>
              New sports collection{' '}
            </p>
            <Link
              className=' before:ease relative  flex h-12 w-40 items-center justify-center overflow-hidden border border-secondary bg-secondary text-center text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-secondary hover:before:-translate-x-40'
              href={'#'}
            >
              <span>Checkout</span>
            </Link>
          </div>
          <div className='flex justify-center gap-8 p-6'>
            <div className='flex flex-col'>
              <Image height={400} alt='summer clothes' src={summerThree} />
              <p>New comfy dress</p>
              <p>166 $</p>
            </div>
            <div>
              <Image height={400} alt='summer clothes' src={summerOne} />
              <p>Elegance complet</p>
              <p>136 $</p>
            </div>
            <div>
              <Image height={400} alt='summer clothes' src={summerTwo} />
              <p>classic t-shirt</p>
              <p>44 $</p>
            </div>
          </div>
        </div>
      </MotionCard>
    </section>
  );
};
