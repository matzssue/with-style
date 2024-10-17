import { Order, Product } from '@prisma/client'

export type ProductsOrders = {
  id: string
  orderId: string
  productId: string
  size: string | null
  product: Product
}

export const mapOrders = (order: Order & { products: ProductsOrders[] }) => {
  return {
    orderId: order.id,
    totalPrice: order.totalPrice,
    totalItems: order.totalItems,
    createdAt: order.createdAt,
    orderNumber: order.orderNumber,
    shippingName: order.shippingName,
    paid: order.paid,
    address: `${order.zip} ${order.city}, ${order.street} ${order.number}`,
    products: order.products.map((productInStore) => {
      return {
        productId: productInStore.productId,
        name: productInStore.product.name,
        price: productInStore.product.price,
        type: productInStore.product.type,
        category: productInStore.product.category,
        size: productInStore.size,
        imgUrl: productInStore.product.imgUrl,
      }
    }),
  }
}
