type ProductsInOrdersData = {
  productId: string
  name: string
  price: number
  type: string
  category: string
  size: string | null
  imgUrl?: string
}

export type OrderData = {
  orderId: string
  totalPrice: number
  totalItems: number
  createdAt: Date
  orderNumber: number
  shippingName: string
  address: string
  products: ProductsInOrdersData[]
}

export type OrdersData = {
  data: OrderData[]
  metadata: {
    totalPages: number
  }
}