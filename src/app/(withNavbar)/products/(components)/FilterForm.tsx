'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { shoesSize, sizes } from '@/constants/sizes'
import { useEffect, useState } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'
import { updateFilters } from '@/actions/products/filter-products'
import {
  FilterProductsSchema,
  filterProductsSchema,
} from '@/lib/schemas/filter-schema'

type PriceFilter = {
  min: number
  max: number
}

const minPrice = 0
const maxPrice = 1000

const defaultFormValues = {
  size: undefined,
  price: [minPrice, maxPrice],
}

export const FilterForm = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [productsType, setProductsType] = useState<string[] | null>(null)
  const [priceFilter, setPriceFilter] = useState<PriceFilter | null>({
    min: defaultFormValues.price[0],
    max: defaultFormValues.price[1],
  })
  const shoesSizeData = shoesSize.map((size) => size.toString())

  useEffect(() => {
    if (pathname.includes('shoes')) {
      setProductsType(shoesSizeData)
    } else if (pathname.includes('accesories')) {
      setProductsType(null)
    } else {
      setProductsType(sizes)
    }
  }, [pathname])

  const form = useForm<FilterProductsSchema>({
    resolver: zodResolver(filterProductsSchema),
    defaultValues: defaultFormValues,
  })

  function onSubmit(data: FilterProductsSchema) {
    const minPrice = data.price[0].toString()
    const maxPrice = data.price[1].toString()
    const size = data.size
    const sortByPrice = searchParams.get('sortByPrice')
    const fitlerData = {
      minPrice,
      maxPrice,
      size,
      sortByPrice,
    }
    updateFilters(fitlerData, pathname)
  }

  return (
    <div className='flex flex-col'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col space-y-6 px-2'
        >
          <p className='py-2 text-3xl font-bold'>Filters</p>
          <FormField
            control={form.control}
            name='size'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Select size' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sizes</SelectLabel>
                      {productsType &&
                        productsType.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <div className='flex flex-row justify-between gap-2'>
                  <p>min:{priceFilter?.min} $</p>
                  <p>max:{priceFilter?.max} $</p>
                </div>
                <FormControl>
                  <Slider
                    min={10}
                    max={1000}
                    step={50}
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      setPriceFilter({ min: value[0], max: value[1] })
                      field.onChange(value)
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button className='m-auto w-1/2' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
