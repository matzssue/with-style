import { ProductPrice } from '@/components/ProductPrice/ProductPrice'
import { publicRoutes } from '@/routes'
import { Product } from '@prisma/client'

import Image from 'next/image'
import Link from 'next/link'
export const HomeProductList = ({
  id,
  imgUrl,
  name,
  price,
  discountPercentage,
}: Product) => {
  return (
    <li className='flex flex-col gap-2'>
      <div className='relative flex h-[300px] w-[220px] items-center max-2xl:h-[260px] max-2xl:w-[180px] max-xl:h-[240px] max-xl:w-[160px] max-sm:h-[400px] max-sm:w-[300px]'>
        <Image
          alt='summer clothes'
          src={imgUrl}
          sizes='(max-width: 768px) 100vw, 100vw'
          fill
        />
      </div>
      <p className='text-2xl font-semibold max-xl:text-xl'>{name}</p>
      <ProductPrice discountPercentage={discountPercentage} price={price} />
      <Link
        className='rounded-sm bg-primary-white px-5 py-2 shadow-sm'
        href={`/${publicRoutes.product}/${id}`}
      >
        Go to product
      </Link>
    </li>
  )
}
