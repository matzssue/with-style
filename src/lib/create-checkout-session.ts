import { MergedProduct } from '@/types/products'
import Stripe from 'stripe'

export const createCheckoutSession = async (
  mergedProducts: MergedProduct[],
  stripe: Stripe,
  orderId: string
) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    locale: 'en',
    line_items: mergedProducts.map((product) => {
      return {
        adjustable_quantity: {
          enabled: true,
          minimum: 0,
          maximum: 99,
        },
        price_data: {
          currency: 'USD',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            images: [product.imgUrl],
          },
        },

        quantity: product.count,
      }
    }),

    mode: 'payment',

    success_url: `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/checkout/cancel`,
    metadata: {
      orderId: orderId,
    },
  })
}
