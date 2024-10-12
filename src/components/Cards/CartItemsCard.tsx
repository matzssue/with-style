import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'
import { CartItemsInModal } from '@/app/(components)/Cart/CartItemsInModal'

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
        <CartItemsInModal
          cart={cart}
          addToCart={addToCart}
          decreaseQuantity={decreaseQuantity}
        />
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
