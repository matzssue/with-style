import manNewProducts from '../../../../public/images/hero-man-sport.webp'
import womanNewProducts from '../../../../public/images/hero-women-summer.webp'
import Image from 'next/image'
import { MotionCard } from '../../../components/Cards/MotionCard'

import { NewCollectionWrapper } from '../../../components/Wrapper/NewCollectionWrapper'

import { collectionLinks } from '@/constants/collection-links'

import { subcategories } from '@/constants/categories'

import { NewCollectionItem } from './NewCollectionItem'

export const NewProducts = () => {
  return (
    <section className='flex h-full  w-5/6 flex-col gap-4 overflow-hidden max-xl:w-full'>
      <MotionCard index={1} key={1}>
        <NewCollectionWrapper className='bg-[#e4ebed]'>
          <NewCollectionItem
            list={collectionLinks}
            subcategory={subcategories.summer}
          />
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
          <NewCollectionItem
            list={collectionLinks}
            subcategory={subcategories.sport}
          />
        </NewCollectionWrapper>
      </MotionCard>
    </section>
  )
}
