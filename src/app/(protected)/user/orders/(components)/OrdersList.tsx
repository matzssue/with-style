import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { adminRoutes, userRoutes } from '@/routes'
import { OrderData } from '@/types/orders'
import Image from 'next/image'
import Link from 'next/link'

export const OrdersList = ({
  ordersData,
  adminList = false,
}: {
  ordersData: OrderData[]
  adminList?: boolean
}) => {
  if (ordersData.length === 0) {
    return <div>Hey! You don&apos;t have any orders</div>
  }

  return (
    <div className='flex w-full'>
      <ul className='flex  w-full flex-col gap-2 rounded-sm  px-4 py-6 shadow-sm'>
        {ordersData.map(
          ({
            orderNumber,
            totalItems,
            totalPrice,
            orderId,
            products,
            paid,
          }) => (
            <Card
              key={orderId}
              className={cn('w-auto border-2 border-secondary')}
            >
              <CardContent className={cn('flex gap-4 py-5 max-md:flex-col')}>
                <div className='flex flex-col gap-2'>
                  <p className=' text-nowrap rounded-md bg-secondary px-4 py-2 text-base shadow-sm'>
                    Order number: <b>{orderNumber} </b>
                  </p>
                  <p>
                    Order status: <b>{paid}</b>
                  </p>
                  <p>
                    Total price: <b>{totalPrice} $</b>
                  </p>
                  <p>
                    Total items: <b>{totalItems}</b>
                  </p>
                  <Button className={cn('w-full')} asChild>
                    <Link
                      href={
                        adminList
                          ? `/${adminRoutes.orderDetails}/${orderId}`
                          : `/${userRoutes.orderDetails}/${orderId}`
                      }
                    >
                      Go to details
                    </Link>
                  </Button>
                </div>
                <div className='flex items-center justify-center gap-5 max-md:flex-col'>
                  <p className='pb-2 text-xl'>Order Products: </p>
                  <div>
                    <ul className='flex flex-wrap gap-6'>
                      {products.map(
                        ({ name, size, price, imgUrl, productId }) => (
                          <li
                            key={productId + size}
                            className='flex flex-col bg-secondary px-4 py-2 shadow-md'
                          >
                            <p className='text-lg font-semibold'>{name}</p>
                            <p>Price: {price} $</p>
                            <p>Size: {size}</p>
                            <div className='w-[70px]'>
                              {imgUrl && (
                                <Image
                                  src={imgUrl}
                                  alt={name}
                                  width='0'
                                  height='0'
                                  sizes='100vw'
                                  className='h-auto w-full'
                                />
                              )}
                            </div>
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
