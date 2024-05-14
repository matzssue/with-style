import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@prisma/client';

export const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className='col-span-5 grid p-6  '>
      <ul className='flex flex-wrap gap-5'>
        {products.map(
          ({ category, imgUrl, name, price, type, id, subcategory }) => (
            <li
              key={id}
              className='relative flex flex-col justify-between gap-5 rounded-md bg-secondary p-10 shadow-md'
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
                style={{ maxHeight: '350px' }}
                height={100}
                width={200}
                alt={name}
                src={imgUrl}
              />
              <div className='flex flex-col gap-x-5 py-1'>
                <p className='py-2 text-lg'>
                  Price: <span className='font-semibold'> {price} $</span>
                </p>

                <div className='flex items-center gap-x-4'>
                  <Link
                    className='rounded-sm bg-white px-4 py-2 shadow-sm hover:scale-105'
                    href={`/products/${id}`}
                  >
                    Go to product
                  </Link>
                  <Heart className='cursor-pointer hover:scale-125 hover:fill-red-500 ' />
                  <ShoppingBag className='cursor-pointer hover:scale-125 hover:fill-white ' />
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
