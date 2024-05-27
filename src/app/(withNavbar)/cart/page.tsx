'use client'

import { useCartStore } from '@/store/useCartStore'
import { ButtonLink } from '@/components/Buttons/ButtonLink'
import { paymentMethods } from '@/constants/payment-methods'
import { CardWrapper } from './(components)/CardWrapper'
import { CartItems } from './(components)/CartItems'
export default function CartPage() {
  const {
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,

    cart: cartItems,
  } = useCartStore((store) => store)

  const isItem = totalItems > 0

  return (
    <section className='flex  justify-center  bg-neutral-50 p-10 '>
      <div className='flex  justify-center gap-6 bg-secondary px-5 py-5 max-lg:w-3/4 max-lg:flex-col max-md:w-full'>
        <CardWrapper>
          <h1 className='border-b-2 border-b-secondary py-2 pb-3 text-center text-2xl font-bold'>
            {isItem && `Your bag : ${totalItems} items`}
          </h1>
          <CartItems />
        </CardWrapper>
        <div className='flex h-max flex-col justify-start gap-y-10  max-lg:gap-y-5'>
          <CardWrapper>
            <p className='text-2xl font-bold'>Total</p>
            <p className='font-semibold'>Total price: {totalPrice}</p>
            <p className='font-semibold'>Total items: {totalItems}</p>
            <ButtonLink href='#'>GO TO CHECKOUT</ButtonLink>
          </CardWrapper>
          <CardWrapper>
            <p className='text-2xl font-bold'>Payment methods</p>
            <ul className='flex gap-5'>
              {paymentMethods.map((method, i) => (
                <li key={i}>{method}</li>
              ))}
            </ul>
          </CardWrapper>
          <CardWrapper>
            <p className='text-2xl  font-bold'>Estimated delivery</p>
            <p>Mon, 20/05, 08:00 - 20:00</p>
          </CardWrapper>
        </div>
      </div>
    </section>
  )
}
