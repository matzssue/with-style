import { getStripe } from '@/lib/get-stripe'
import { fetchData } from '@/lib/helplers/fetchData'

import { PaymentData } from '@/types/products'
import Stripe from 'stripe'

type StripeData = {
  result: Stripe.Checkout.Session
  ok: boolean
}

export const pay = async (paymentData: PaymentData) => {
  const stripe = await getStripe()
  if (!stripe) {
    return
  }

  try {
    const stripeData = await fetchData<StripeData>('api/checkout_sessions', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })

    if (!stripeData) throw new Error('Something went wrong')

    await stripe.redirectToCheckout({
      sessionId: stripeData.result.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Payment failed: ${error.message}`)
    } else {
      throw new Error('Payment failed: Unknown error')
    }
  }
}
