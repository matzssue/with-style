import Image from 'next/image'

import { Product } from '@prisma/client'
import Link from 'next/link'
import { ProductPrice } from '@/app/(components)/Products/ProductPrice/ProductPrice'
import { publicRoutes } from '@/routes'

export default function TopProduct({
  imgUrl,
  name,
  price,
  subcategory,
  id,
  type,
  discountPercentage,
}: Product) {
  return (
    <Link className='cursor-pointer' href={`/${publicRoutes.product}/${id}`}>
      <div className='flex h-full flex-col justify-between bg-neutral-100 px-2 py-2 '>
        <div>
          <p className='text-xl font-semibold'>{name}</p>
          <p className='m-0 text-lg italic'>{type}</p>
        </div>
        <div className='flex  items-center justify-center'>
          <div className='relative'>
            <Image width={700} height={700} src={imgUrl} alt={name} />
            <span className='absolute bottom-1 left-1 bg-slate-200 px-2 py-1 font-semibold'>
              {subcategory}
            </span>
          </div>
        </div>
        <div>
          <ProductPrice discountPercentage={discountPercentage} price={price} />
        </div>
      </div>
    </Link>
  )
}
