'use client'

import { editProduct } from '@/actions/products/edit-product'
import Alert from '@/components/Alert/Alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { productSchema, ProductSchema } from '@/lib/schemas/product-schema'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product, ProductCategory, ProductType } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'

import { useForm } from 'react-hook-form'

const categories = Object.values(ProductCategory)
const types = Object.values(ProductType)

export const EditProductForm = ({ product }: { product: Product }) => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      category: product.category,
      imgUrl: product.imgUrl,
      price: product.price,
      subcategory: product.subcategory,
      type: product.type,
    },
  })

  const onSubmit = (values: ProductSchema) => {
    setError('')
    setSuccess('')
    editProduct(values).then((data) => {
      setSuccess(data.success)
      setError(data.error)
    })
  }

  return (
    <Card
      className={cn(
        ' mx-auto my-10  flex w-full max-w-[600px] flex-col items-center justify-center border-none bg-secondary'
      )}
    >
      <CardHeader>Edit product</CardHeader>
      <CardContent className='w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select product type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='imgUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image link</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='shadcn' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='shadcn' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type='submit'>
              Submit
            </Button>
            {error && <Alert type='error'>{error}</Alert>}
            {success && <Alert type='success'>{success}</Alert>}
            <Button
              asChild
              className={cn(
                'bg-transparent py-0 text-primary hover:bg-transparent hover:underline'
              )}
            >
              <Link href={'/admin/products'}>Back</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
