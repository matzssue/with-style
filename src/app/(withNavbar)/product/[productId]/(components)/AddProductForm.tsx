'use client'

import { Heart, ShoppingBag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SelectSize } from '@/components/Select/SelectSize'
import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Product, Size } from '@prisma/client'
import { useCartActions } from '@/hooks/use-add-product-to-cart'
import { error } from 'console'

interface SizeFormInput {
  size: Size | null
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
                    {product.size.map((size: Size) => (
                      <SelectItem key={size} value={size}>
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

        {/* <Button>
        Add to wishlist
        <span className='ml-5'>
          <Heart />
        </span>
      </Button> */}
      </form>
    </Form>
  )
}
