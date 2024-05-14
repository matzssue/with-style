import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { getAllProducts } from '@/data/products';
import { ProductList } from './(components)/ProductsList';

export default async function Products() {
  const products = await getAllProducts();

  return (
    <div className='grid grid-cols-6'>
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
      <ProductList products={products} />
    </div>
  );
}
