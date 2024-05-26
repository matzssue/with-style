import manNewProducts from '../../../public/images/hero-man-sport.webp'
import womanNewProducts from '../../../public/images/hero-women-summer.webp'
import Image from 'next/image'
import { MotionCard } from '../Cards/MotionCard'

import { ButtonLink } from '../Buttons/ButtonLink'
import { getProductsBySubcategory } from '@/data/products'
import { HomeProductList } from './HomeProductList'

export const NewProducts = async () => {
  const sportProducts = await getProductsBySubcategory('SPORT', 3)
  const summerProducts = await getProductsBySubcategory('SUMMER', 3)

  return (
    <section className='flex w-full flex-col overflow-x-hidden'>
      <div className='flex justify-around'>
        <MotionCard index={1} key={1}>
          <div className='flex flex-col items-center justify-center gap-y-32 bg-[#e4ebed]'>
            <div className='flex flex-col items-center gap-y-5'>
              <p className='text-4xl font-bold text-primary'>
                New summer collection{' '}
              </p>
              <ButtonLink href='#'>Check collection</ButtonLink>
            </div>
            <div className='flex justify-center gap-8 p-6'>
              <ul className='flex justify-center gap-8 p-6'>
                {summerProducts.map((product) => (
                  <HomeProductList {...product} />
                ))}
              </ul>
            </div>
          </div>
          <Image src={womanNewProducts} width={700} alt='woman-model' />
        </MotionCard>
      </div>
      <MotionCard index={2} key={2}>
        <Image src={manNewProducts} alt='man-model' width={700} />
        <div className='flex flex-col items-center justify-center gap-y-32 bg-[#e7e6e0]'>
          <div className='flex flex-col items-center gap-y-5'>
            <p className='text-4xl font-bold text-primary'>
              New sports collection{' '}
            </p>
            <ButtonLink href='#'>Check collection</ButtonLink>
          </div>
          <div className='flex justify-center gap-8 p-6'>
            <ul className='flex justify-center gap-8 p-6'>
              {sportProducts.map((product) => (
                <HomeProductList key={product.id} {...product} />
              ))}
            </ul>
          </div>
        </div>
      </MotionCard>
    </section>
  )
}
