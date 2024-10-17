'use client'

import { Loading } from '@/components/Loading/Loading'
import { Button } from '@/components/ui/button'
import { getStripeSession } from '@/data/stripe/get-stripe-session'
import { useCartStore } from '@/store/useCartStore'
import { CircleCheckBig } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Stripe from 'stripe'

export default function PaymentSuccessPage({
  searchParams: { session_id },
}: {
  searchParams: { session_id: string }
}) {
  const { resetCart } = useCartStore((store) => store)
  const [sessionData, setSessionData] =
    useState<Stripe.Checkout.Session | null>(null)

  useEffect(() => {
    const fetchSessionData = async () => {
      if (session_id) {
        const session = await getStripeSession(session_id)
        const sessionData = session[0]
        setSessionData(sessionData)
        if (sessionData) {
          resetCart()
        }
      }
    }

    fetchSessionData()
  }, [session_id, resetCart])

  if (!sessionData) {
    return <Loading />
  }
  return (
    <main className='flex h-screen items-center justify-center bg-neutral-100 p-10'>
      <div className='flex w-1/2 flex-col gap-5 rounded-sm bg-secondary py-8 text-center shadow-md '>
        <p className='px-5 py-2 text-3xl font-bold text-primary-white'>
          Payment Success !
        </p>
        <p className='flex items-center justify-center py-5'>
          <CircleCheckBig size='120' />
        </p>
        <div className='flex flex-col items-center justify-center'>
          <span className='w-1/2 rounded-lg bg-primary px-2 py-4 shadow-md'>
            <p className='text-2xl text-secondary'>Amount paid:</p>
            <p className='text-xl text-secondary'>
              {sessionData.amount_total && sessionData.amount_total / 100} $
            </p>
            <p className='text-xl text-primary-white'>
              Thank you {sessionData.customer_details?.name}
            </p>
          </span>
        </div>
        <Button asChild className='w-1/2 self-center'>
          <Link href={'/'}>Back to home page</Link>
        </Button>
      </div>
    </main>
  )
}
