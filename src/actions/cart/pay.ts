import { getStripe } from '@/lib/get-stripe'

import { PaymentData } from '@/types/products'

export const pay = async (paymentData: PaymentData) => {
  const stripe = await getStripe()
  if (!stripe) {
    return
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/checkout_sessions`,
      {
        method: 'POST',
        body: JSON.stringify(paymentData),
      }
    )
    const data = await response.json()

    if (!data.ok) throw new Error('Something went wrong')
    await stripe.redirectToCheckout({
      sessionId: data.result.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Payment failed: ${error.message}`)
    } else {
      throw new Error('Payment failed: Unknown error')
    }
  }
}
