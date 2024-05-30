import manNewProducts from '../../../public/images/hero-man-sport.webp'
import womanNewProducts from '../../../public/images/hero-women-summer.webp'
import Image from 'next/image'
import { MotionCard } from '../Cards/MotionCard'

import { ButtonLink } from '../Buttons/ButtonLink'
import { getProductsBySubcategory } from '@/data/products'
import { HomeProductList } from './HomeProductList'
import { NewCollectionWrapper } from '../Wrapper/NewCollectionWrapper'

export const NewProducts = async () => {
  const sportProducts = await getProductsBySubcategory('SPORT', 3)
  const summerProducts = await getProductsBySubcategory('SUMMER', 3)

  return (
    <section className='flex h-full  w-5/6 flex-col gap-4 overflow-hidden max-xl:w-full'>
      <MotionCard index={1} key={1}>
        <NewCollectionWrapper className='bg-[#e4ebed]'>
          <div className='flex flex-col items-center gap-y-5 max-lg:py-6'>
            <p className='text-4xl font-bold text-primary '>
              New summer collection
            </p>
            <ButtonLink href='#'>Check collection</ButtonLink>
          </div>

          <ul className='flex flex-wrap justify-center gap-5 px-6 '>
            {summerProducts.map((product) => (
              <HomeProductList key={product.id} {...product} />
            ))}
          </ul>
        </NewCollectionWrapper>
        <div className='relative h-full w-[650px] max-lg:hidden '>
          <Image
            src={womanNewProducts}
            alt='woman-model'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </MotionCard>

      <MotionCard index={2} key={2}>
        <div className='relative h-full w-[650px] max-lg:hidden'>
          <Image
            src={manNewProducts}
            alt='man-model'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <NewCollectionWrapper className='bg-[#cdcbf0]'>
          <div className='flex flex-col items-center gap-y-5 max-lg:py-6'>
            <p className='text-4xl font-bold text-primary'>
              New sports collection
            </p>
            <ButtonLink href='#'>Check collection</ButtonLink>
          </div>

          <ul className='flex flex-wrap justify-center gap-5 px-6 '>
            {sportProducts.map((product) => (
              <HomeProductList key={product.id} {...product} />
            ))}
          </ul>
        </NewCollectionWrapper>
      </MotionCard>
    </section>
  )
}
