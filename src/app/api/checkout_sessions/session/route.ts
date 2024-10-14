import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id')
    if (!sessionId) {
      return NextResponse.json(
        {
          error: 'Bad Request: Missing session id',
        },
        { status: 400 }
      )
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json([session, { success: true }])
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error
      return NextResponse.json({ message }, { status: error.statusCode })
    }

    return new NextResponse('Internal Server', { status: 500 })
  }
}
