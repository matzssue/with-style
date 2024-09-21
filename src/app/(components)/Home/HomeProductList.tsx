import { calculatePriceWithDiscount } from '@/lib/helplers/calculatePriceWithDiscount'
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
  const discountPrice = calculatePriceWithDiscount(price, discountPercentage)

  return (
    <li key={id} className='flex flex-col gap-2'>
      <div className='relative h-[300px] w-[200px]  max-2xl:h-[250px] max-2xl:w-[150px]'>
        <Image alt='summer clothes' src={imgUrl} fill />
      </div>
      <p className='text-2xl font-semibold max-xl:text-xl'>{name}</p>
      <p className='text-xl max-xl:text-lg'>
        <span
          className={`font-semibold ${discountPrice ? 'line-through' : ''}`}
        >
          {price}$
        </span>{' '}
        {discountPercentage && (
          <span className='font-semibold text-red-500'>
            {' '}
            -{discountPercentage}% {discountPrice}$
          </span>
        )}
      </p>
      <Link
        className='rounded-sm bg-primary-white px-5 py-2 shadow-sm'
        href={`/product/${id}`}
      >
        Go to product
      </Link>
    </li>
  )
}
