'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { BasketIcon } from '../../../public/icons/BasketIcon'
import { CartItemsCard } from '../Cards/CartItemsCard'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'

export const ShoppingBag = () => {
  const totalItems = useCartStore((store) => store.totalItems)

  return (
    <Popover>
      <PopoverTrigger className=' relative hover:scale-105'>
        <BasketIcon />
        <div className='border-1 absolute -bottom-3 -right-3 m-0 flex h-6 w-6 items-center justify-center rounded-full bg-secondary font-bold text-primary'>
          <span>{totalItems}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[300px]  p-0 max-md:w-screen')}>
        <CartItemsCard />
      </PopoverContent>
    </Popover>
  )
}
