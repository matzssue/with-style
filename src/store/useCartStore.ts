import { create } from 'zustand';
import type { Product } from '@prisma/client';
import { persist, createJSONStorage } from 'zustand/middleware';
import { it } from 'node:test';
type ProductQuantity = {
  quantity: number;
};

export type ProductInStore = Product & ProductQuantity;

type Store = {
  cart: ProductInStore[];
  totalItems: number;
  totalPrice: number;
};

type Actions = {
  addToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  decreaseQuantity: (Item: Product) => void;
};

const INITIAL_STATE = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<Store & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) => {
            if (!item.quantity) {
              item.quantity = 1;
            }

            return item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          });
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: +(state.totalPrice + product.price).toFixed(2),
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: +(state.totalPrice + product.price).toFixed(2),
          }));
        }
      },
      decreaseQuantity: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);
        console.log('my cart item', cartItem);
        if (cartItem?.id === product.id && cartItem?.quantity > 1) {
          const updatedCart = cart.map((item) => {
            if (item.id === cartItem.id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          });
          console.log(updatedCart, 'updated cart');
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: +(state.totalPrice - product.price).toFixed(2),
          }));
        } else {
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== product.id),
            totalItems: state.totalItems - 1,
            totalPrice: +(state.totalPrice - product.price).toFixed(2),
          }));
        }
      },
      removeFromCart: (product: Product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
          totalItems: 0,
          totalPrice: +(state.totalPrice - product.price).toFixed(2),
        }));
      },
    }),
    { name: 'cart-storage' }
  )
);
