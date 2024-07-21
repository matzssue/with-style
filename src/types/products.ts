import { AddressSchema } from '@/lib/schemas/auth-schema'
import { ProductInStore } from '@/store/useCartStore'
import { Product } from '@prisma/client'

export type ProductsData = {
  data: Product[]
  metadata: {
    totalPages: number
  }
}
export type ProductsInCheckout = {
  totalItems: number
  cart: ProductInStore[]
}
export type AddOrderData = AddressSchema & { amount: number } & {
  productsData: ProductsInCheckout
}
export type ProductsQueryParams = {
  category?: string
  type?: string
  size?: string
  minPrice?: string
  maxPrice?: string
}
