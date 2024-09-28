import { calculatePriceWithDiscount } from '@/lib/helplers/calculatePriceWithDiscount'
import { useCartStore } from '@/store/useCartStore'

import { Product } from '@prisma/client'
import { toast } from 'sonner'

export const useCartActions = () => {
  const addToCart = useCartStore((state) => state.addToCart)

  const addProductToCart = (size: string | null, product: Product) => {
    const priceWithDiscount = calculatePriceWithDiscount(
      product.price,
      product.discountPercentage
    )

    const price = priceWithDiscount ?? product.price

    const productToAdd = {
      ...product,
      id: product.id,
      storeId: product.id + size,
      size: size,
      quantity: 1,
      price,
    }
    addToCart(productToAdd)
    toast('Product added to cart')
  }
  return {
    addProductToCart,
  }
}
