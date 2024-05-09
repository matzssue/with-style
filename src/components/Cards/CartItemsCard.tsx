import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import shoes from '../../../public/shoes1.jpg';
import Link from 'next/link';
export const CartItemsCard = () => {
  return (
    <Card className={cn('border-0')}>
      <CardHeader>
        <CardTitle>Bag</CardTitle>
        <CardDescription>your products</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='max-h-60 overflow-y-scroll'>
          <li className='flex gap-5 border-b-2 py-5'>
            <Image height={50} alt='basket item' src={shoes} />
            <div>
              <p className='font-semibold'>Buty addidas najnowsze</p>
              <p>
                <span className='font-semibold'>Size:</span> 25
              </p>
              <p>
                <span className='font-semibold'>Queantity:</span> 1
              </p>
            </div>
          </li>
          <li className='flex gap-5 border-b-2 py-5'>
            <Image height={50} alt='basket item' src={shoes} />
            <div>
              <p className='font-semibold'>Buty addidas najnowsze</p>
              <p>
                <span className='font-semibold'>Size:</span> 25
              </p>
              <p>
                <span className='font-semibold'>Queantity:</span> 1
              </p>
            </div>
          </li>
          <li className='flex gap-5 border-b-2 py-5'>
            <Image height={50} alt='basket item' src={shoes} />
            <div>
              <p className='font-semibold'>Buty addidas najnowsze</p>
              <p>
                <span className='font-semibold'>Size:</span> 25
              </p>
              <p>
                <span className='font-semibold'>Queantity:</span> 1
              </p>
            </div>
          </li>
          <li className='flex gap-5 border-b-2 py-5'>
            <Image height={50} alt='basket item' src={shoes} />
            <div>
              <p className='font-semibold'>Buty addidas najnowsze</p>
              <p>
                <span className='font-semibold'>Size:</span> 25
              </p>
              <p>
                <span className='font-semibold'>Queantity:</span> 1
              </p>
            </div>
          </li>
        </ul>
      </CardContent>
      <CardFooter className={cn('flex flex-col items-start gap-2')}>
        <p>
          <span className='font-semibold'>Total amount</span> : 350PLN
        </p>
        <p>
          <span className='font-semibold'>Items</span>: 5
        </p>
        <Link
          href='#'
          className='my-2 w-full  bg-secondary px-5 py-2 text-center text-white hover:opacity-90'
        >
          Go to bag
        </Link>
      </CardFooter>
    </Card>
  );
};
