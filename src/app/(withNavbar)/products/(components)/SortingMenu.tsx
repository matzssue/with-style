'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { usePathname, useSearchParams } from 'next/navigation'
import { updateFilters } from '@/actions/products/filter-products'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  sortProductsSchema,
  SortProductsSchema,
} from '@/lib/schemas/sort-schema'

const priceSortTypes = [
  { title: 'Default', value: '' },
  {
    title: 'Ascending',
    value: 'asc',
  },
  { title: 'Descending', value: 'desc' },
]

type DefaultValues = {
  sortByPrice: '' | 'asc' | 'desc'
}

const defaultFormValues: DefaultValues = {
  sortByPrice: '',
}

export const SortingMenu = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const form = useForm<SortProductsSchema>({
    resolver: zodResolver(sortProductsSchema),
    defaultValues: defaultFormValues,
  })

  function onSubmit(data: SortProductsSchema) {
    const filterData = {
      ...data,
      minPrice: searchParams.get('minPrice'),
      maxPrice: searchParams.get('maxPrice'),
    }
    updateFilters(filterData, pathname)
  }
  return (
    <div className='flex gap-5'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex space-y-6 px-2'
        >
          <FormField
            control={form.control}
            name='sortByPrice'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'
                  >
                    {priceSortTypes.map(({ title, value }) => (
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className='font-normal'>{title}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='m-auto w-1/2' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
