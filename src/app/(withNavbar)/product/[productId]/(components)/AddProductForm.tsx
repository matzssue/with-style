'use client'

import { ShoppingBag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Product } from '@prisma/client'
import { useCartActions } from '@/hooks/use-add-product-to-cart'

interface SizeFormInput {
  size: string | null
}

export const AddProductForm = ({ product }: { product: Product }) => {
  const [sizeError, setSizeError] = useState<string>('')
  const { addProductToCart } = useCartActions()
  const sizeForm = useForm({
    defaultValues: {
      size: null,
    },
  })

  const onSubmit: SubmitHandler<SizeFormInput> = (data) => {
    const size = data.size
    if (product.size.length > 0 && !size) {
      setSizeError('Please select size')
    } else {
      addProductToCart(size, product)
    }
  }

  return (
    <Form {...sizeForm}>
      <form
        onSubmit={sizeForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-2'
      >
        {product.size.length > 0 ? (
          <FormField
            control={sizeForm.control}
            name='size'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Please select size' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {product.size.map((size: string | number) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          ''
        )}
        <p>{sizeError}</p>
        <Button type='submit'>
          Add product to Bag
          <span className='ml-5'>
            <ShoppingBag />
          </span>
        </Button>
      </form>
    </Form>
  )
}
