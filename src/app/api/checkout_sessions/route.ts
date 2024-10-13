import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { orderSchema } from '@/lib/schemas/auth-schema'
import { currentUser } from '@/lib/auth/auth'
import { PaymentData } from '@/types/products'
import prisma from '@/lib/prisma'

import { getProductsById } from '@/data/products/get-products-by-id'
import { calculatePriceWithDiscount } from '@/lib/helplers/calculatePriceWithDiscount'
import { createCheckoutSession } from '@/lib/create-checkout-session'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(request: NextRequest) {
  const paymentData = (await request.json()) as PaymentData
  const productIds = paymentData.products.map((product) => product.productId)

  try {
    const user = await currentUser()

    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      )
    }

    const products = await getProductsById(productIds)

    const mergedProducts = paymentData.products
      .map((productItem) => {
        const findProduct = products.find((p) => p.id === productItem.productId)
        if (!findProduct) return null

        const price = calculatePriceWithDiscount(
          findProduct.price,
          findProduct.discountPercentage
        )

        return {
          ...findProduct,
          price: price ?? findProduct.price,
          count: productItem.count,
          size: productItem.size,
        }
      })
      .filter((item) => item !== null)

    const totalSummary = mergedProducts.reduce(
      (acc, product) => {
        const productCount = product.count
        const productPrice = product.price
        const totalProductPrice = productPrice * productCount

        return {
          totalCount: acc.totalCount + productCount,
          totalPrice: acc.totalPrice + totalProductPrice,
        }
      },
      { totalCount: 0, totalPrice: 0 }
    )

    const checkoutSession = await createCheckoutSession(mergedProducts, stripe)
    if (checkoutSession.payment_status === 'unpaid') {
      return NextResponse.json(
        { error: 'Payment was not completed successfully' },
        { status: 400 }
      )
    }

    const { orderData } = paymentData
    const validateOrder = orderSchema.safeParse(orderData)

    if (validateOrder.error) {
      return NextResponse.json(
        { error: validateOrder.error.errors.map((e) => e.message).join(', ') },
        { status: 400 }
      )
    }

    await prisma.order.create({
      data: {
        userId: user.id,
        totalItems: totalSummary.totalCount,
        totalPrice: totalSummary.totalPrice,
        city: orderData.city,
        phoneNumber: orderData.phoneNumber,
        shippingName: `${orderData.name} ${orderData.surname}`,
        street: orderData.street,
        number: orderData.number,
        zip: orderData.zip,
        products: {
          create: mergedProducts.map((product) => ({
            size: product.size,
            product: {
              connect: { id: product.id },
            },
          })),
        },
      },
      include: {
        products: true,
      },
    })

    return NextResponse.json({ result: checkoutSession, ok: true })
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error
      return NextResponse.json({ message }, { status: error.statusCode })
    }
    console.log(error, 'error')
    return new NextResponse('Internal Server', { status: 500 })
  }
}
