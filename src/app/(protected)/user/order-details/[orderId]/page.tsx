import { getOrder } from '@/data/orders/get-order'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

import Image from 'next/image'

export default async function Page({
  params,
}: {
  params: { orderId: string }
}) {
  const { orderId } = params
  const {
    address,
    createdAt,
    orderNumber,
    products,
    shippingName,
    totalItems,
    totalPrice,
  } = await getOrder(orderId)
  const orderDate = new Date(createdAt).toLocaleString()

  return (
    <section className='flex items-center justify-center py-5'>
      <Card className={cn('border-secondary')}>
        <CardHeader>
          <CardTitle
            className={cn(
              'rounded-sm bg-secondary px-4 py-2 text-primary shadow-sm'
            )}
          >
            Order number : {orderNumber}
          </CardTitle>
        </CardHeader>
        <CardContent className={cn('flex flex-col gap-2')}>
          <div className='text-lg'>
            <p>
              Order time: <b>{orderDate}</b>
            </p>
            <p>
              Purchaser: <b>{shippingName}</b>
            </p>
            <p>
              Delivery address: <b>{address}</b>
            </p>
            <span className='flex gap-2'>
              <p>
                Items: <b>{totalItems}</b>
              </p>
              <p>
                Total price: <b> {totalPrice} $</b>
              </p>
            </span>
          </div>
          <div className='rounded-md bg-neutral-100 px-6 py-4'>
            <ul className=' flex gap-5 '>
              {products.map(
                ({ name, price, productId, size, imgUrl, type, category }) => (
                  <li className='flex  gap-5' key={productId}>
                    <div>
                      <span>
                        <p className=' text-lg font-semibold'>{name}</p>
                        <p className='italic'>{category}</p>
                        <p className='italic'>{type}</p>
                      </span>
                      <span>
                        <p>
                          Price: <b>{price} $</b>
                        </p>
                        <p>
                          Size: <b>{size}</b>
                        </p>
                      </span>
                    </div>
                    {imgUrl && (
                      <Image height={150} width={150} src={imgUrl} alt={name} />
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
