import { Stripe, loadStripe } from '@stripe/stripe-js'

if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
  throw new Error('Provide Publishable key')
}

let stripePromise: Promise<Stripe | null>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string)
  }
  return stripePromise
}
