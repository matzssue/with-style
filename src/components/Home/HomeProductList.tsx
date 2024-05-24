import { Product } from '@prisma/client'

import Image from 'next/image'
import Link from 'next/link'
export const HomeProductList = ({ id, imgUrl, name, price }: Product) => {
  return (
    <li key={id} className='flex flex-col gap-2'>
      <Image
        style={{ width: '300px', height: '400px' }}
        height={500}
        width={300}
        alt='summer clothes'
        src={imgUrl}
      />
      <p className='text-2xl font-semibold'>{name}</p>
      <p className='text-xl '>{price} $</p>
      <Link
        className='rounded-sm bg-primary-white px-5 py-2 shadow-sm'
        href={`/product/${id}`}
      >
        Go to product
      </Link>
    </li>
  )
}
