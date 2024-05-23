import { useCartStore } from '@/store/useCartStore'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'

export const CartItems = () => {
  const {
    cart: cartItems,
    decreaseQuantity,
    addToCart,
  } = useCartStore((store) => store)

  return (
    <ul className='flex  flex-col gap-5'>
      {cartItems.map((product) => (
        <li
          key={product.id}
          className='flex gap-5 border-b-2 border-b-secondary p-2'
        >
          <div>
            <Image
              alt={product.name}
              src={product.imgUrl}
              width={100}
              height={100}
            />
          </div>
          <div>
            <p className='text-xl font-semibold'>{product.name}</p>
            <p className='flex gap-x-2 '>
              Quantity:
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
            <p>Price: {product.price}</p>
            <p>
              Total price:{' '}
              {Number(+product.quantity * +product.price).toFixed(2)}
            </p>
            <p>Size: M</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
