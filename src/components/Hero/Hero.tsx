import { Button } from '../ui/button';
import Image from 'next/image';
import mainImage from '../../../public/main_image.png';
import secondImage from '../../../public/second_image.png';
import bg from '../../../public/images/testbg1.jpg';
import { cn } from '@/lib/utils';
import { ButtonLink } from '../Buttons/ButtonLink';
import Link from 'next/link';
export const Hero = () => {
  return (
    <section className="my-5 flex h-[30rem] w-full justify-between bg-[url('https://i.ibb.co/PQ32nyH/testbg1.jpg')] bg-cover bg-center">
      <div className='flex w-3/5 flex-col items-center   justify-center p-5'>
        <div className='flex w-1/2 flex-col justify-start gap-1 px-5 py-2 text-start'>
          <div className='rounded-md bg-neutral-200 bg-opacity-55 px-2 py-4'>
            <h1 className='py-2 text-4xl font-bold text-primary'>
              New collection is currently available
            </h1>
            <h2 className='text-xl text-primary'>Check our sales</h2>
            <p className='text-4xl font-bold text-red-500'>UP TO -50%</p>
          </div>
          <Link
            className='rounded-sm bg-secondary py-4 text-center text-2xl font-bold text-primary-white shadow-md'
            href={'#'}
          >
            Sales
          </Link>
        </div>
      </div>

      <div className='relative flex h-full w-2/5 items-center justify-center pr-5'>
        <div className=''>
          {/* <Image alt='first hero image' src={secondImage} /> */}
        </div>
        <div className='absolute'>
          {/* <Image alt='second hero image' src={mainImage} /> */}
        </div>
      </div>
    </section>
  );
};
