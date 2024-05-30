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
import { Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { ProductInStore, useCartStore } from '@/store/useCartStore'

export const CartItemsCard = () => {
  const { cart, totalItems, totalPrice, decreaseQuantity, addToCart } =
    useCartStore((store) => store)

  return (
    <Card className={cn('border-0')}>
      <CardHeader>
        <CardTitle>Bag</CardTitle>
        <CardDescription>your products</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='max-h-60 overflow-y-scroll'>
          {cart.map((product: ProductInStore) => (
            <li
              key={product.storeId}
              className='flex w-full gap-5 border-b-2 py-5'
            >
              <Image
                height={90}
                width={90}
                alt={product.name}
                src={product.imgUrl}
              />
              <div>
                <p className='font-semibold'>{product.name}</p>
                <p>
                  <span className='font-semibold'>Size:</span> {product.size}
                </p>
                <p className='flex '>
                  <Minus
                    className='cursor-pointer'
                    onClick={() => decreaseQuantity(product)}
                  />

                  {product.quantity}
                  <Plus
                    onClick={() => addToCart(product)}
                    className='cursor-pointer'
                  />
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
