import { Button } from '../ui/button';
import Image from 'next/image';
import mainImage from '../../../public/main_image.png';
import secondImage from '../../../public/second_image.png';

export const Hero = () => {
  return (
    <section className='my-5 flex h-[30rem] justify-between bg-secondary '>
      <div className='flex w-3/5 flex-col items-center   justify-center p-5'>
        <div className='flex w-1/2 flex-col justify-start gap-1 text-start'>
          <h1 className='text-3xl font-bold'>
            New collection is currently available
          </h1>
          <h2 className='text-xl'>Checkout our sales</h2>
          <p className='text-4xl font-bold text-red-500'>UP TO -50%</p>
          <Button className='mt-5 bg-secondary-foreground text-xl'>
            Sales
          </Button>
        </div>
      </div>

      <div className='relative flex h-full w-2/5 items-center justify-center pr-5'>
        <div className=''>
          <Image alt='first hero image' src={secondImage} />
        </div>
        <div className='absolute'>
          <Image alt='second hero image' src={mainImage} />
        </div>
      </div>
    </section>
  );
};
