import { OrderData } from '@/types/orders'
import Image from 'next/image'
export const OrderDetails = ({ order }: { order: OrderData }) => {
  const { address, products, shippingName, totalItems, totalPrice, createdAt } =
    order
  const orderDate = new Date(createdAt).toLocaleString()
  return (
    <>
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
        <p className='py-2 text-2xl'>Products:</p>
        <ul className=' flex flex-wrap gap-5 max-md:flex-col '>
          {products.map(
            ({ name, price, productId, size, imgUrl, type, category }) => (
              <li
                className='flex max-w-[400px] justify-between gap-5 '
                key={productId + size}
              >
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
                  <Image
                    height={150}
                    width={150}
                    src={imgUrl}
                    alt={name}
                    className='w-auto max-w-[200px]'
                  />
                )}
              </li>
            )
          )}
        </ul>
      </div>
    </>
  )
}
