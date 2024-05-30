import { useCartStore } from '@/store/useCartStore'
import { ProductInStore } from '@/store/useCartStore'
import { Product, Size } from '@prisma/client'

export const useCartActions = () => {
  const addToCart = useCartStore((state) => state.addToCart)

  const addProductToCart = (size: Size | null, product: Product) => {
    const productToAdd = {
      ...product,
      id: product.id,
      storeId: product.id + size,
      size: size,
      quantity: 1,
    }
    addToCart(productToAdd)
  }
  return {
    addProductToCart,
  }
}
