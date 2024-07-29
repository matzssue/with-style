import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getStatistics } from '@/data/admin/statistics'
import { useCurrentRole } from '@/hooks/use-current-role'
import { currentRole } from '@/lib/auth/auth'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function AdminDashboard() {
  const role = await currentRole()

  const { numberOfOrders, numberOfProducts, numberOfUsers } =
    await getStatistics()

  return (
    <Card
      className={cn(
        'my-10 flex w-full flex-1 flex-col items-center border-none'
      )}
    >
      <CardHeader>
        <p className='text-3xl'>Admin Page</p>
      </CardHeader>

      <CardContent>
        <ul className='my-5 flex gap-2 px-6 py-4 text-xl'>
          <li>
            <Link
              className='bg-secondary px-4 py-2 font-semibold text-primary hover:bg-textHover'
              href={'/admin/products/add'}
            >
              Add product
            </Link>
          </li>
          <li>
            <Link
              className='bg-secondary px-4 py-2 font-semibold text-primary hover:bg-textHover'
              href={'/admin/products'}
            >
              Go to products
            </Link>
          </li>
          <li>
            <Link
              className='bg-secondary px-4 py-2 font-semibold text-primary hover:bg-textHover'
              href={'/admin/orders'}
            >
              Go to orders
            </Link>
          </li>
        </ul>
        <div>
          <div className='flex w-full flex-col gap-2 rounded-sm bg-neutral-100 px-6 py-4 shadow-md '>
            <p className='text-4xl font-semibold text-secondary'>Statistics</p>
            <p className='text-xl'>
              <b>Orders :</b> {numberOfOrders}
            </p>
            <p className='text-xl'>
              <b>Products :</b> {numberOfProducts}
            </p>
            <p className='text-xl'>
              <b>Users :</b> {numberOfUsers}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
