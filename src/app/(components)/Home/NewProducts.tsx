import manNewProducts from '../../../../public/images/hero-man-sport.webp'
import womanNewProducts from '../../../../public/images/hero-women-summer.webp'
import Image from 'next/image'
import { MotionCard } from '../../../components/Cards/MotionCard'

import { ButtonLink } from '../../../components/Buttons/ButtonLink'

import { HomeProductList } from './HomeProductList'
import { NewCollectionWrapper } from '../../../components/Wrapper/NewCollectionWrapper'
import { getProductsBySubcategory } from '@/data/products/get-products'

export const NewProducts = async () => {
  const { data: sportProducts } = await getProductsBySubcategory('SPORT', 3)

  const { data: summerProducts } = await getProductsBySubcategory('SUMMER', 3)

  return (
    <section className='flex h-full  w-5/6 flex-col gap-4 overflow-hidden max-xl:w-full'>
      <MotionCard index={1} key={1}>
        <NewCollectionWrapper className='bg-[#e4ebed]'>
          <div className='flex flex-col items-center gap-y-5 max-lg:py-6'>
            <p className='text-4xl font-bold text-primary '>
              New summer collection
            </p>
            <div className='flex gap-2'>
              <ButtonLink href='/products/man?subcategory=summer'>
                Man collection
              </ButtonLink>
              <ButtonLink href='/products/woman?subcategory=summer'>
                Woman collection
              </ButtonLink>{' '}
            </div>
          </div>

          <ul className='flex w-full flex-wrap items-center justify-center gap-5 px-6 '>
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
            sizes='(max-width: 768px) 100vw, 33vw'
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
            sizes='(max-width: 768px) 100vw, 33vw'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <NewCollectionWrapper className='bg-[#cdcbf0]'>
          <div className='flex flex-col items-center gap-y-5 max-lg:py-6'>
            <p className='text-4xl font-bold text-primary'>
              New sports collection
            </p>
            <div className='flex gap-2'>
              <ButtonLink href='/products/man?subcategory=sport'>
                Man collection
              </ButtonLink>
              <ButtonLink href='/products/woman?subcategory=sport'>
                Woman collection
              </ButtonLink>{' '}
            </div>
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
