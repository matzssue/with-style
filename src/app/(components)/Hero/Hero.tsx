import { heroLinks } from '@/constants/hero-links'
import Link from 'next/link'
export const Hero = () => {
  return (
    <section className="mb-5 flex h-[600px] w-full justify-between bg-[url('https://i.ibb.co/PQ32nyH/testbg1.jpg')] bg-cover bg-center max-lg:h-[400px]">
      <div className='flex w-full flex-col items-center justify-center p-5'>
        <div className='ml-10 flex flex-col justify-start gap-1 self-start px-7 py-2  text-start max-md:ml-0 max-md:gap-2 max-md:self-center'>
          <div className=' rounded-lg bg-neutral-200  bg-opacity-70 px-5  py-7 max-md:py-4'>
            <h1 className=' text-nowrap py-2 text-5xl font-bold text-primary max-lg:text-3xl max-md:text-2xl'>
              We are currently running sales!
            </h1>
            <h2 className='text-xl text-primary'>
              Check our products with promotions
            </h2>
            <p className='text-4xl font-bold  italic text-red-500 max-lg:text-2xl'>
              UP TO -50%
            </p>
          </div>
          <div className='flex w-full gap-2 max-md:flex-col max-md:gap-1'>
            {heroLinks.map(({ link, title }) => (
              <Link
                className='w-full rounded-sm bg-secondary py-4 text-center text-2xl font-bold text-primary-white shadow-md max-lg:text-xl max-md:py-3'
                href={`/products/${link}?promotions=true`}
                key={title}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
