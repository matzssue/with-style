import { Button } from '@/components/ui/button'
import { getStripeSession } from '@/data/stripe/get-stripe-session'
import { CircleCheckBig } from 'lucide-react'
import Link from 'next/link'

export default async function PaymentSuccessPage({
  searchParams: { session_id },
}: {
  searchParams: { session_id: string }
}) {
  const session = await getStripeSession(session_id)
  const sessionData = session[0]
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
