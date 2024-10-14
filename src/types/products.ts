import { OrderSchema } from '@/lib/schemas/auth-schema'
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
  amount: number
  cart: ProductInStore[]
}

export type ProductsToPayment = {
  productId: string
  count: number
  size: string | null
}

export type PaymentData = {
  orderData: OrderSchema
  products: ProductsToPayment[]
}

export type MergedProduct = Omit<Product, 'size'> & {
  size: string | null
  count: number
}
export type AddOrderData = OrderSchema & {
  productsData: MergedProduct[]
} & { totalPrice: number; totalItems: number }

export type ProductsQueryParams = {
  category?: string
  type?: string
  size?: string
  minPrice?: string
  maxPrice?: string
  page?: string
  sortByPrice?: string
  promotions?: string
  subcategory?: string
}
export type ProductSearchParams = {
  minPrice?: string
  maxPrice?: string
  size?: string
  page?: string
  sortByPrice?: string
  promotions?: string
  subcategory?: string
}
