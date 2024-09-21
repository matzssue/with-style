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
import { cn } from '@/lib/utils'

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
      size: searchParams.get('size'),
      promotions: searchParams.get('promotions'),
    }
    updateFilters(filterData, pathname)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-x-5 bg-neutral-100 px-3 py-2 max-lg:justify-center max-md:flex-col'
      >
        <FormField
          control={form.control}
          name='sortByPrice'
          render={({ field }) => (
            <FormItem className='flex items-center justify-center gap-5 space-y-0 max-md:flex-col '>
              <FormLabel className='flex  text-lg font-semibold'>
                Sort by price
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex'
                >
                  {priceSortTypes.map(({ title, value }) => (
                    <FormItem
                      key={value}
                      className={cn('flex items-center space-x-3 space-y-0')}
                    >
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

        <button
          className='rounded-md px-2 py-2 font-bold text-primary underline'
          type='submit'
        >
          Save
        </button>
      </form>
    </Form>
  )
}
