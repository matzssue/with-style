import { getOrder } from '@/data/orders/get-order'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { OrderDetails } from '../../../../(components)/Orders/OrderDetails'

export default async function Page({
  params,
}: {
  params: { orderId: string }
}) {
  const { orderId } = params
  const order = await getOrder(orderId)

  return (
    <section className='my-5 flex items-center justify-center px-2 py-5'>
      <Card className={cn('border-secondary')}>
        <CardHeader>
          <CardTitle
            className={cn(
              'rounded-sm bg-secondary px-4 py-2 text-primary shadow-sm'
            )}
          >
            Order number : {order.orderNumber}
          </CardTitle>
        </CardHeader>
        <CardContent className={cn('flex flex-col gap-2')}>
          <OrderDetails order={order} />
          <Button asChild>
            <Link href={'/user/orders'}>Back</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
