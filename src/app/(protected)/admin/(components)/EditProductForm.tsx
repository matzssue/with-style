'use client'

import { editProduct } from '@/actions/products/edit-product'
import { FormFieldInput } from '@/components/Inputs/FormFieldInput'
import { FormFieldSelect } from '@/components/Inputs/FormFieldSelect'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form } from '@/components/ui/form'

import { productSchema, ProductSchema } from '@/lib/schemas/product-schema'
import { cn } from '@/lib/utils'
import { adminRoutes } from '@/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product, ProductCategory, ProductType } from '@prisma/client'

import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const categories = Object.values(ProductCategory)
const types = Object.values(ProductType)

export const EditProductForm = ({ product }: { product: Product }) => {
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
      discountPercentage: product.discountPercentage,
      size: product.size,
    },
  })

  const onSubmit = async (values: ProductSchema) => {
    const response = await editProduct(values)

    if (response.success) {
      toast('Product successfully edited')
    } else if (response.error) {
      toast('An error occurred while editing the product')
    }
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
            <FormFieldInput
              control={form.control}
              name='name'
              label='Product name'
              placeholder={product.name}
            />
            <FormFieldSelect
              control={form.control}
              name='category'
              label='Select category'
              placeholder={product.category}
              selectItems={categories}
            />
            <FormFieldSelect
              control={form.control}
              name='type'
              label='Select product type'
              placeholder={product.type}
              selectItems={types}
            />
            <FormFieldInput
              control={form.control}
              name='imgUrl'
              label='Image link'
              placeholder={product.imgUrl}
            />
            <FormFieldInput
              control={form.control}
              name='price'
              label='Price'
              type='number'
              placeholder={product.imgUrl}
            />
            <FormFieldInput
              control={form.control}
              name='discountPercentage'
              label='Discount percentage'
              type='number'
              placeholder={product.imgUrl}
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
              <Link href={`/${adminRoutes.products}`}>Back</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
