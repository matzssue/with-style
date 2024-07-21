import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { OrderData } from '@/types/orders'
import Image from 'next/image'
import Link from 'next/link'

export const OrdersList = async ({
  ordersData,
}: {
  ordersData: OrderData[]
}) => {
  if (!ordersData) {
    return <div>Loading...</div>
  }

  if (ordersData.length === 0) {
    return <div>Hey! You don&apos;t have any orders</div>
  }

  return (
    <div className='flex w-auto'>
      <ul className='flex  w-auto flex-col gap-2 rounded-sm  px-4 py-6 shadow-sm'>
        {ordersData.map(
          ({ orderNumber, totalItems, totalPrice, orderId, products }) => (
            <Card className={cn('w-auto border-2 border-secondary')}>
              <CardContent className={cn('flex gap-4 py-5')}>
                <div className='flex flex-col gap-2'>
                  <p className='rounded-md bg-secondary px-4 py-2 text-lg shadow-sm'>
                    Order number: <b>{orderNumber} </b>
                  </p>
                  <p>
                    Total price: <b>{totalPrice} $</b>
                  </p>
                  <p>
                    Total items: <b>{totalItems}</b>
                  </p>
                  <Button className={cn('w-full')} asChild>
                    <Link href={`/user/order-details/${orderId}`}>
                      Go to details
                    </Link>
                  </Button>
                </div>
                <div className='flex items-center justify-center gap-5'>
                  <p className='pb-2 text-xl'>Order Products: </p>
                  <div>
                    <ul className='flex gap-6'>
                      {products.map(
                        ({ name, size, price, imgUrl, productId }) => (
                          <li
                            key={productId}
                            className='flex flex-col bg-secondary px-4 py-2 shadow-md'
                          >
                            <p className='text-lg font-semibold'>{name}</p>
                            <p>Price: {price} $</p>
                            <p>Size: {size}</p>
                            {imgUrl && (
                              <Image
                                width={50}
                                height={50}
                                alt={name}
                                src={imgUrl}
                              />
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </ul>
    </div>
  )
}
