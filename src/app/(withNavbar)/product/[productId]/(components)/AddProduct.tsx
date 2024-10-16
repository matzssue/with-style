'use client'

import { ShoppingBag } from 'lucide-react'
import type { Product } from '@prisma/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

import { cn } from '@/lib/utils'
import { useCartActions } from '@/hooks/use-add-product-to-cart'

export const AddProduct = (product: Product) => {
  const { addProductToCart } = useCartActions()

  if (!product) return null
  return (
    <>
      {product.size.length > 0 ? (
        <Select
          onValueChange={(value: string) => addProductToCart(value, product)}
        >
          <SelectTrigger
            showIcon={false}
            className={cn(
              'w-auto border-0 bg-transparent focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0'
            )}
          >
            <ShoppingBag className='cursor-pointer hover:scale-125 hover:fill-white ' />
          </SelectTrigger>
          <SelectContent>
            {product.size.map((size) => (
              <SelectItem showCheck={false} key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <ShoppingBag
          className='cursor-pointer hover:scale-125 hover:fill-white '
          onClick={() => addProductToCart(null, product)}
        />
      )}
    </>
  )
}
