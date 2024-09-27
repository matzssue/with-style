import { calculatePriceWithDiscount } from '@/lib/helplers/calculatePriceWithDiscount'
import { Product } from '@prisma/client'

export const ProductPrice = ({
  price,
  discountPercentage,
  direction = 'row',
}: {
  price: number
  discountPercentage: number | null
  direction?: 'row' | 'column'
}) => {
  const discountPrice = calculatePriceWithDiscount(price, discountPercentage)

  return (
    <p className={`flex flex-${direction}`}>
      Price:{' '}
      <span className={`font-semibold ${discountPrice ? 'line-through' : ''}`}>
        {price}$
      </span>{' '}
      {discountPercentage && (
        <div className='flex gap-2 px-1'>
          <span className='flex font-semibold text-red-500'>
            -{discountPercentage}%
          </span>
          <span className='flex font-semibold text-red-500'>
            {discountPrice}$
          </span>
        </div>
      )}
    </p>
  )
}
