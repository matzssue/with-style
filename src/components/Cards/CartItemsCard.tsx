import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import shoes from '../../../public/shoes1.jpg'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'

export const CartItemsCard = () => {
  const { cart, totalItems, totalPrice } = useCartStore((store) => store)

  return (
    <Card className={cn('border-0')}>
      <CardHeader>
        <CardTitle>Bag</CardTitle>
        <CardDescription>your products</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='max-h-60 overflow-y-scroll'>
          {cart.map(({ imgUrl, quantity, name, id }) => (
            <li key={id} className='flex gap-5 border-b-2 py-5'>
              <Image height={50} width={50} alt={name} src={imgUrl} />
              <div>
                <p className='font-semibold'>{name}</p>
                <p>
                  <span className='font-semibold'>Size:</span> 25
                </p>
                <p>
                  <span className='font-semibold'>Queantity:</span> {quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className={cn('flex flex-col items-start gap-2')}>
        <p>
          <span className='font-semibold'>Total amount</span> : {totalPrice} $
        </p>
        <p>
          <span className='font-semibold'>Items</span>: {totalItems}
        </p>
        <Link
          href='/cart'
          className='my-2 w-full  bg-secondary px-5 py-2 text-center text-white hover:opacity-90'
        >
          Go to bag
        </Link>
      </CardFooter>
    </Card>
  )
}
