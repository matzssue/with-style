'use client'

import { addProduct } from '@/actions/products/add-product'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Form } from '@/components/ui/form'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductCategory, ProductType } from '@prisma/client'
import Link from 'next/link'

import { useForm } from 'react-hook-form'

import { sizeType } from '@/constants/sizes'
import { toast } from 'sonner'
import { adminRoutes } from '@/routes'
import { productSchema, ProductSchema } from '@/lib/schemas/product-schema'
import { FormFieldInput } from '@/components/Inputs/FormFieldInput'
import { FormFieldSelect } from '@/components/Inputs/FormFieldSelect'
import { FormFieldMultiSelect } from '@/components/Inputs/FormFieldMultiSelect'

const categories = Object.values(ProductCategory)
const types = Object.values(ProductType)

export const AddProductForm = () => {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
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

  const selectedCategory = form.watch('category')
  const selectedSizes =
    sizeType[selectedCategory as keyof typeof sizeType] || []

  const onSubmit = async (values: ProductSchema) => {
    const addProductData = {
      ...values,
      size: values.size ?? [],
    }

    const response = await addProduct(addProductData)

    if (response.success) {
      toast('Product successfully added')
    } else if (response.error) {
      toast('An error occurred while adding the product')
    }
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
            <FormFieldInput<ProductSchema>
              control={form.control}
              name='name'
              label=''
            />
            <div className='flex justify-between max-sm:flex-col'>
              <FormFieldSelect
                control={form.control}
                label='Category'
                name='category'
                selectItems={categories}
                className='w-2/5 max-sm:w-full'
                placeholder='Select product category'
              />
              <FormFieldSelect
                control={form.control}
                label='Type'
                name='type'
                selectItems={types}
                className='w-2/5 max-sm:w-full'
                placeholder='Select product type'
              />
            </div>
            <div className='flex justify-between'>
              <FormFieldInput<ProductSchema>
                control={form.control}
                name='subcategory'
                label='Subcategory'
                className='w-2/6'
              />
              <FormFieldInput<ProductSchema>
                control={form.control}
                name='discountPercentage'
                label='Discount percentage'
                type='number'
              />
              <FormFieldInput<ProductSchema>
                control={form.control}
                name='price'
                label='Price'
                type='number'
              />
            </div>
            <FormFieldInput<ProductSchema>
              control={form.control}
              name='price'
              label='Image link'
              placeholder='https://example.com/'
            />

            <FormFieldMultiSelect
              control={form.control}
              label='Size'
              list={selectedSizes}
              name='size'
              className='max-w-xs'
              placeholder='Select size'
            />
            <Button className='w-full' type='submit'>
              Submit
            </Button>

            <Button
              asChild
              className={cn(
                'bg-transparent py-0 text-primary hover:bg-transparent hover:underline'
              )}
            >
              <Link href={`/${adminRoutes.default}`}>Back</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
