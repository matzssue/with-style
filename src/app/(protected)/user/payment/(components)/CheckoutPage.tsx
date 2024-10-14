'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'

import { orderSchema, OrderSchema } from '@/lib/schemas/auth-schema'
import { Button } from '@/components/ui/button'
import { PaymentData } from '@/types/products'
import { useCartStore } from '@/store/useCartStore'
import { pay } from '@/actions/cart/pay'
import { FormFieldInput } from '@/components/Inputs/FormFieldInput'

export const CheckoutPage = () => {
  const { cart, totalPrice } = useCartStore((store) => store)

  const form = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
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

  const onSubmit = async (values: OrderSchema) => {
    const products = cart.map((product) => {
      return {
        productId: product.id,
        count: product.quantity,
        size: product.size,
      }
    })

    const paymentData: PaymentData = {
      orderData: values,
      products: products,
    }

    await pay(paymentData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' w-full max-w-[800px] rounded-sm bg-neutral-50 p-5 shadow-md '
      >
        <div className='flex flex-col gap-5 py-5'>
          <p className='w-1/4 rounded-md bg-secondary px-2 py-2  text-lg  font-bold text-primary'>
            Delivery
          </p>
          <div className='flex flex-wrap gap-5'>
            <FormFieldInput
              control={form.control}
              name='name'
              label='Name'
              className='w-full max-w-[250px]'
            />
            <FormFieldInput
              control={form.control}
              name='surname'
              label='Surname'
              className='w-full max-w-[250px]'
            />
            <FormFieldInput
              control={form.control}
              name='phoneNumber'
              label='Phone number'
              placeholder='+XX XXXXXXXXX'
              className='w-full max-w-[250px]'
            />
            <FormFieldInput
              control={form.control}
              name='city'
              label='City'
              className='w-full max-w-[250px]'
            />
            <FormFieldInput
              control={form.control}
              name='zip'
              label='Post code'
              placeholder='XX-XXX'
              className='w-full max-w-[100px]'
            />
            <FormFieldInput
              control={form.control}
              name='street'
              label='Street'
              className='w-full max-w-[250px]'
            />
            <FormFieldInput
              control={form.control}
              name='number'
              label='Number'
              className='w-full max-w-[100px]'
            />
          </div>
        </div>
        <Button className='w-full text-center'>{`Pay ${totalPrice} $`}</Button>
      </form>
    </Form>
  )
}
