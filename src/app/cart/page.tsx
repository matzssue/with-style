'use client';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { FaCcMastercard, FaPaypal, FaCcVisa } from 'react-icons/fa';
import { ButtonLink } from '@/components/Buttons/ButtonLink';
import { paymentMethods } from '@/constants/payment-methods';
import { CardWrapper } from './(components)/CardWrapper';
import { CartItems } from './(components)/CartItems';
export default function CartPage() {
  const {
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,

    cart: cartItems,
  } = useCartStore((store) => store);

  return (
    <section className='flex  justify-center  bg-neutral-50 p-10 '>
      <div className='flex  justify-center gap-12 bg-secondary p-7'>
        <CardWrapper>
          <h1 className='border-b-2 border-b-secondary pb-3 text-center text-2xl font-bold'>
            Your bag : {totalItems} items
          </h1>
          <CartItems />
        </CardWrapper>
        <div className='flex h-max flex-col justify-start gap-y-10 p-3'>
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

          <CardWrapper>
            <p className='text-2xl font-bold'>Total</p>
            <p className='font-semibold'>Total price: {totalPrice}</p>
            <p className='font-semibold'>Total items: {totalItems}</p>
            <ButtonLink href='#'>GO TO CHECKOUT</ButtonLink>
          </CardWrapper>
        </div>
      </div>
    </section>
  );
}
