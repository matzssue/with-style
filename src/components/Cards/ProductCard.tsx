import { Product } from '@prisma/client'
import { ReactNode } from 'react'
import Image from 'next/image'

import { ProductPrice } from '../ProductPrice/ProductPrice'

export const ProductCard = ({
  children,
  product,
}: {
  children: ReactNode
  product: Product
}) => {
  const { id, imgUrl, name, price, subcategory, type, discountPercentage } =
    product

  return (
    <li
      key={id}
      className={`relative flex w-[300px] flex-col justify-between gap-5 rounded-md bg-secondary p-10 shadow-md  max-md:w-[250px] `}
    >
      {subcategory && (
        <span className='absolute -right-2 -top-2 rounded-sm border border-secondary bg-neutral-50 px-4 py-2 font-semibold'>
          {subcategory}
        </span>
      )}
      <div>
        <p className='text-xl font-bold'>{name}</p>
        <p className=' font-semibold italic'>{type}</p>
      </div>

      <Image
        height={300}
        width={200}
        style={{ width: 'auto', height: 'auto', maxHeight: '320px' }}
        alt={name}
        src={imgUrl}
      />
      <div className='flex flex-col gap-x-5 py-1'>
        <ProductPrice
          discountPercentage={discountPercentage}
          direction='column'
          price={price}
        />
      </div>

      {children}
    </li>
  )
}
