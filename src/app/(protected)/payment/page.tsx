'use client'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { convertToSubcurrency } from '@/lib/convertToSubcurrency'
import { CheckoutPage } from './(components)/CheckoutPage'
import { useParams } from 'next/navigation'
import { useCartStore } from '@/store/useCartStore'

if (process.env.NEXT_PUBLIC_STRIPE_KEY === undefined) {
  throw new Error('STRIPE_KEY is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

export default function PaymentPage() {
  const amount = useCartStore((store) => store.totalPrice)

  return (
    <section className='flex items-center justify-center'>
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubcurrency(amount),
          currency: 'usd',
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </section>
  )
}
