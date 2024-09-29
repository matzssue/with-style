'use client'

import { Loading } from '@/components/Loading/Loading'
import { convertToSubcurrency } from '@/lib/helplers/convertToSubcurrency'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AddressSchema, addressSchema } from '@/lib/schemas/auth-schema'
import { Button } from '@/components/ui/button'
import { addOrder } from '@/actions/orders/add-order'

import { ProductsInCheckout } from '@/types/products'

import { useCartStore } from '@/store/useCartStore'
import { removeOrder } from '@/actions/orders/remove-order'

export const CheckoutPage = ({
  amount,
  productsData,
}: {
  amount: number
  productsData: ProductsInCheckout
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState<string>()
  const [loading, setLoading] = useState(false)

  const resetCart = useCartStore((store) => store.resetCart)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [amount])

  const form = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      city: '',
      name: '',
      number: '',
      phoneNumber: '',
      street: '',
      surname: '',
      zip: '',
    },
  })

  const onSubmit = async (values: AddressSchema) => {
    setLoading(true)
    if (!stripe || !elements || !clientSecret) {
      return
    }
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false)
      return
    }

    const order = await addOrder({ ...values, amount, productsData })

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/payment-success?amount=${amount}`,
      },
    })
    resetCart()
    if (error) {
      setErrorMessage(error.message)
      await removeOrder(order.id)
    }

    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div>
        <Loading />
        Loading...
      </div>
    )
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' w-full max-w-[800px] rounded-sm bg-neutral-50 p-5 shadow-md '
      >
        <p className='w-full text-center text-3xl'>Checkout</p>
        <div className=' gap-5 py-5'>
          <p className='my-5 w-1/4 rounded-md bg-secondary px-2 py-2 text-lg font-bold text-primary'>
            Payment
          </p>
          {clientSecret && <PaymentElement />}
          {errorMessage && <div>{errorMessage}</div>}
        </div>
        <div className='flex flex-col gap-5 py-5'>
          <p className='w-1/4 rounded-md bg-secondary px-2 py-2  text-lg  font-bold text-primary'>
            Delivery
          </p>
          <div className='flex flex-wrap gap-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full max-w-[250px]'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='surname'
              render={({ field }) => (
                <FormItem className='w-full max-w-[250px]'>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem className='w-full max-w-[250px]'>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder='+XX XXXXXXXXX' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem className='w-full max-w-[250px]'>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='zip'
              render={({ field }) => (
                <FormItem className='w-full max-w-[100px]'>
                  <FormLabel>Post code</FormLabel>
                  <FormControl>
                    <Input placeholder='XX-XXX' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='street'
              render={({ field }) => (
                <FormItem className='w-full max-w-[250px]'>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='number'
              render={({ field }) => (
                <FormItem className='w-full max-w-[100px]'>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className='w-full text-center' disabled={!stripe || loading}>
          {!loading ? `Pay ${amount} $` : 'Loading...'}
        </Button>
      </form>
    </Form>
  )
}
