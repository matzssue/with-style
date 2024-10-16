import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import Stripe from 'stripe'

export const getStripeSession = async (
  sessionId: string
): Promise<Stripe.Checkout.Session[]> => {
  const subcategoryTitles = await fetchData<Stripe.Checkout.Session[]>(
    `api/checkout_sessions/session?session_id=${sessionId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    }
  )

  return subcategoryTitles
}
