import { create } from 'zustand'
import type { ProductCategory, ProductType } from '@prisma/client'
import { persist } from 'zustand/middleware'

export type ProductInStore = {
  id: string
  storeId: string
  name: string
  price: number
  category: ProductCategory
  subcategory: string | null
  type: ProductType
  imgUrl: string
  size: string | null
  quantity: number
}

type Store = {
  cart: ProductInStore[]
  totalItems: number
  totalPrice: number
}

type Actions = {
  addToCart: (Item: ProductInStore) => void
  removeFromCart: (Item: ProductInStore) => void
  decreaseQuantity: (Item: ProductInStore) => void
  resetCart: () => void
}

const INITIAL_STATE = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
}

export const useCartStore = create(
  persist<Store & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: ProductInStore) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.storeId === product.storeId)
        if (cartItem) {
          const updatedCart = cart.map((item) => {
            return item.storeId === product.storeId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          })
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: +(state.totalPrice + product.price).toFixed(2),
          }))
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }]
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: +(state.totalPrice + product.price).toFixed(2),
          }))
        }
      },
      decreaseQuantity: (product: ProductInStore) => {
        const cart = get().cart
        const cartItem = cart.find((item) => item.storeId === product.storeId)
        if (cartItem && cartItem?.quantity > 1) {
          const updatedCart = cart.map((item) => {
            if (item.storeId === cartItem.storeId) {
              return { ...item, quantity: item.quantity - 1 }
            } else {
              return item
            }
          })

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: +(state.totalPrice - product.price).toFixed(2),
          }))
        } else {
          set((state) => ({
            cart: state.cart.filter((item) => item.storeId !== product.storeId),
            totalItems: state.totalItems - 1,
            totalPrice: +(state.totalPrice - product.price).toFixed(2),
          }))
        }
      },
      removeFromCart: (product: ProductInStore) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.storeId !== product.storeId),
          totalItems: 0,
          totalPrice: +(state.totalPrice - product.price).toFixed(2),
        }))
      },
      resetCart: () => {
        set(() => ({
          cart: INITIAL_STATE.cart,
          totalItems: INITIAL_STATE.totalItems,
          totalPrice: INITIAL_STATE.totalPrice,
        }))
      },
    }),
    { name: 'cart-storage' }
  )
)
