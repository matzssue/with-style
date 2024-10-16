import { ProductInStore } from '@/store/useCartStore'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'

export const CartItemsInModal = ({
  decreaseQuantity,
  addToCart,
  cart,
}: {
  cart: ProductInStore[]
  decreaseQuantity: (item: ProductInStore) => void
  addToCart: (item: ProductInStore) => void
}) => {
  return (
    <ul className='max-h-60 overflow-y-scroll'>
      {cart.map((product: ProductInStore) => (
        <li key={product.storeId} className='flex w-full gap-5 border-b-2 py-5'>
          <Image
            height={90}
            width={90}
            alt={product.name}
            src={product.imgUrl}
          />
          <div>
            <p className='font-semibold'>{product.name}</p>
            <p>
              <span className='font-semibold'>Size:</span> {product.size}
            </p>
            <p className='flex '>
              <Minus
                className='cursor-pointer'
                onClick={() => decreaseQuantity(product)}
              />

              {product.quantity}
              <Plus
                onClick={() => addToCart(product)}
                className='cursor-pointer'
              />
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
