import { calculatePriceWithDiscount } from '@/lib/helplers/calculatePriceWithDiscount'

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
    <div className={`flex flex-${direction} gap-1`}>
      Price:
      <span className={`font-semibold ${discountPrice ? 'line-through' : ''}`}>
        {price}$
      </span>
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
    </div>
  )
}
