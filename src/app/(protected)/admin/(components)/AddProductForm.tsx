'use client'

import { addProduct } from '@/actions/products/add-product'

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

import {
  addProductSchema,
  AddProductSchema,
} from '@/lib/schemas/product-schema'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductCategory, ProductType } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/Select/Multiselect'
import { shoeSizeToString, sizes } from '@/constants/sizes'
import { toast } from 'sonner'

const categories = Object.values(ProductCategory)
const types = Object.values(ProductType)

export const AddProductForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: '',
      category: undefined,
      imgUrl: '',
      price: 0,
      subcategory: null,
      type: undefined,
      size: [],
      discountPercentage: null,
    },
  })

  useEffect(() => {
    if (selectedCategory === 'SHOES') {
      setSelectedSizes(shoeSizeToString)
    } else if (selectedCategory === 'ACCESSORIES' || selectedCategory === '') {
      setSelectedSizes([])
    } else {
      setSelectedSizes(sizes)
    }
  }, [selectedCategory])

  const onSubmit = (values: AddProductSchema) => {
    setError('')
    setSuccess('')
    const addProductData = {
      ...values,
      size: values.size ?? [],
    }

    addProduct(addProductData).then((data) => {
      setError(data.error)
      setSuccess(data.success)
      if (data.success) {
        toast('Product successfully added')
      }
    })
  }

  return (
    <Card
      className={cn(
        ' my-10  flex w-full  max-w-[600px] flex-col items-center justify-center border-none bg-secondary'
      )}
    >
      <CardHeader>
        <p className='text-xl font-semibold'>Add Product</p>
      </CardHeader>
      <CardContent className='w-full'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col space-y-6'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between max-sm:flex-col'>
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem className='w-2/5 max-sm:w-full'>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange()
                        setSelectedCategory(value)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select product category' />
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
                  <FormItem className='w-2/5 max-sm:w-full'>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select product type' />
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
            </div>
            <div className='flex justify-between'>
              <FormField
                control={form.control}
                name='subcategory'
                render={({ field }) => (
                  <FormItem className='w-2/6'>
                    <FormLabel>Subcategory</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='discountPercentage'
                render={({ field }) => (
                  <FormItem className='w-2/6'>
                    <FormLabel>Discount percentage</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem className='w-1/6'>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='imgUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image link</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='https://example.com/'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='size'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value ?? []}
                      onValuesChange={field.onChange}
                      className='max-w-xs'
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder='Select size' />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {selectedSizes.map((size) => (
                            <MultiSelectorItem
                              key={size}
                              value={size.toString()}
                            >
                              <span>{size.toString()}</span>
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
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
              <Link href={'/admin'}>Back</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
