import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import ProductButton from './(components)/ProductButton';
import { getAllProducts } from '@/data/products';

export default async function Products() {
  const products = await getAllProducts();

  return (
    <div className='grid grid-cols-5'>
      <div className=' col-span-1 grid content-start justify-start gap-5 border-r-2 bg-neutral-100 py-5 pl-8'>
        <p className='text-4xl font-bold'>Filters</p>
        <ul>
          <p className='py-2 text-xl font-semibold'>Gender</p>
          <li>
            <Checkbox /> Man
          </li>
          <li>
            <Checkbox /> Woman
          </li>
        </ul>
        <ul>
          <p className='py-2 text-xl font-semibold'>Category</p>
          <li>
            <Checkbox /> Clothing
          </li>
          <li>
            <Checkbox /> Shoes
          </li>
          <li>
            <Checkbox /> Accessiories
          </li>
        </ul>
      </div>

      <div className='col-span-4 grid p-6  '>
        <ul className='flex flex-wrap gap-5'>
          {products.map(({ category, imgUrl, name, price, type, id }) => (
            <li className='flex flex-col justify-between gap-5 rounded-md bg-secondary p-10 shadow-md'>
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
                  <Heart />
                  <ShoppingBag />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
