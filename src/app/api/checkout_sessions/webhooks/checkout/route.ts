import Stripe from 'stripe'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { updateOrder } from '@/actions/orders/update-order'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!
  const sig = headers().get('stripe-signature') as string
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    })
  }

  const eventType = event.type
  if (
    eventType !== 'checkout.session.completed' &&
    eventType !== 'checkout.session.async_payment_succeeded'
  )
    return new Response('Server Error', {
      status: 500,
    })

  const session = event.data.object
  const orderId = session.metadata?.orderId

  if (!orderId)
    return new Response('Order error', {
      status: 400,
    })

  try {
    if (session.payment_status === 'paid') {
      updateOrder(orderId, { paid: 'paid' })
    }
    return new Response('Subscription added', {
      status: 200,
    })
  } catch (error) {
    return new Response('Server error', {
      status: 500,
    })
  }
}
