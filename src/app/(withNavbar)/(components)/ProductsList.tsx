'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import type { Product } from '@prisma/client'

import { useCartStore } from '@/store/useCartStore'
import { useState } from 'react'

export const ProductList = ({ products }: { products: Product[] }) => {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className='p-6'>
      <ul className='flex flex-wrap gap-5'>
        {products.map((product) => (
          <li
            key={product.id}
            className='relative flex flex-col justify-between gap-5 rounded-md bg-secondary p-10 shadow-md'
          >
            {product.subcategory && (
              <span className='absolute -right-2 -top-2 rounded-sm border border-secondary bg-neutral-50 px-4 py-2 font-semibold'>
                {product.subcategory}
              </span>
            )}
            <div>
              <p className='text-xl font-bold'>{product.name}</p>
              <p className=' font-semibold italic'>{product.type}</p>
            </div>

            <Image
              // style={{ maxHeight: '350px', maxWidth: '200px' }}
              height={300}
              width={200}
              alt={product.name}
              src={product.imgUrl}
            />
            <div className='flex flex-col gap-x-5 py-1'>
              <p className='py-2 text-lg'>
                Price: <span className='font-semibold'> {product.price} $</span>
              </p>

              <div className='flex items-center gap-x-4'>
                <Link
                  className='rounded-sm bg-white px-4 py-2 shadow-sm hover:scale-105'
                  href={`/product/${product.id}`}
                >
                  Go to product
                </Link>
                <Heart className='cursor-pointer hover:scale-125 hover:fill-red-500 ' />
                <ShoppingBag
                  onClick={() => addToCart(product)}
                  className='cursor-pointer hover:scale-125 hover:fill-white '
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
