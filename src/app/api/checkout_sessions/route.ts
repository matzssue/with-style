import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { orderSchema } from '@/lib/schemas/auth-schema'
import { currentUser } from '@/lib/auth/auth'
import { AddOrderData, MergedProduct, PaymentData } from '@/types/products'
import { getProductsById } from '@/data/products/get-products-by-id'
import { calculatePriceWithDiscount } from '@/lib/helplers/calculatePriceWithDiscount'
import { createCheckoutSession } from '@/lib/create-checkout-session'
import { addOrder } from '@/actions/orders/add-order'

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

    const mergedProducts: MergedProduct[] = paymentData.products
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

    const { orderData } = paymentData
    const validateOrder = orderSchema.safeParse(orderData)

    if (validateOrder.error) {
      return NextResponse.json(
        { error: validateOrder.error.errors.map((e) => e.message).join(', ') },
        { status: 400 }
      )
    }

    const createOrderData: AddOrderData = {
      name: orderData.name,
      surname: orderData.surname,
      city: orderData.city,
      phoneNumber: orderData.phoneNumber,
      number: orderData.number,
      street: orderData.street,
      zip: orderData.zip,
      productsData: mergedProducts,
      totalItems: totalSummary.totalCount,
      totalPrice: totalSummary.totalPrice,
      paid: 'pending',
    }

    const createOrder = await addOrder(createOrderData)

    if (!createOrder) {
      return NextResponse.json(
        { message: 'Error while creating an order' },
        { status: 400 }
      )
    }

    const orderId = createOrder.orderId

    const checkoutSession = await createCheckoutSession(
      mergedProducts,
      stripe,
      orderId
    )

    return NextResponse.json({ result: checkoutSession, ok: true })
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error
      return NextResponse.json({ message }, { status: error.statusCode })
    }

    return new NextResponse('Internal Server', { status: 500 })
  }
}
