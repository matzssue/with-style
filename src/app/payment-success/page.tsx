import { Button } from '@/components/ui/button'
import { CircleCheckBig } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage({
  searchParams: { amount },
}: {
  searchParams: { amount: string }
}) {
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
            <p className='text-xl text-secondary'>{amount} $</p>
          </span>
        </div>
        <Button asChild className='w-1/2 self-center'>
          <Link href={'/'}>Back to home page</Link>
        </Button>
      </div>
    </main>
  )
}
