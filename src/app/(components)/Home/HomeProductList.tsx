import { ProductPrice } from '@/components/ProductPrice/ProductPrice'
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
    <li key={id} className='flex flex-col gap-2'>
      <div className='relative h-[300px] w-[200px]  max-2xl:h-[250px] max-2xl:w-[150px]'>
        <Image
          alt='summer clothes'
          src={imgUrl}
          sizes='(max-width: 768px) 100vw, 33vw'
          fill
        />
      </div>
      <p className='text-2xl font-semibold max-xl:text-xl'>{name}</p>
      <ProductPrice discountPercentage={discountPercentage} price={price} />
      <Link
        className='rounded-sm bg-primary-white px-5 py-2 shadow-sm'
        href={`/product/${id}`}
      >
        Go to product
      </Link>
    </li>
  )
}
