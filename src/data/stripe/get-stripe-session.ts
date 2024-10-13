import { getCookies } from '@/lib/auth/sessionCookies'
import Stripe from 'stripe'

export const getStripeSession = async (sessionId: string) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/checkout_sessions/session?session_id=${sessionId}`
    )

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data: Stripe.Checkout.Session[] = await response.json()

    return data
  } catch (err) {
    throw new Error('Error getting subcategory titles')
  }
}
