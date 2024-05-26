import Image from 'next/image'
import shoes from '../../../public/shoes1.jpg'
import { Product } from '@prisma/client'
import Link from 'next/link'
export default function ProductCard({
  imgUrl,
  name,
  price,
  subcategory,
  id,
}: Product) {
  return (
    <Link className='cursor-pointer' href={`/product/${id}`}>
      <div className='c flex h-full flex-col justify-between bg-neutral-100 px-2 py-2 '>
        <p className='text-xl font-semibold'>{name}</p>
        <div className='flex  items-center justify-center'>
          <div className='relative'>
            <Image
              width={800}
              height={800}
              style={{ maxHeight: '400px' }}
              src={imgUrl}
              alt={name}
              className='relative'
            />
            <span className='absolute bottom-1 left-1 bg-slate-200 px-2 py-1 font-semibold'>
              {subcategory}
            </span>
          </div>
        </div>
        <div>
          <p>
            Price: <span className='font-semibold'> {price}$</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
