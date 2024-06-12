'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { sizes } from '@/constants/sizes'
import { useState } from 'react'
import { updateFilters } from '@/actions/filter-products'
import { usePathname } from 'next/navigation'

const FormSchema = z.object({
  size: z.string().optional(),
  price: z.number().array(),
})

type PriceFilter = {
  min: number
  max: number
}

const defaultFormValues = {
  size: undefined,
  price: [0, 1000],
}

export const FilterForm = () => {
  const pathname = usePathname()
  const [priceFilter, setPriceFilter] = useState<PriceFilter | null>({
    min: defaultFormValues.price[0],
    max: defaultFormValues.price[1],
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultFormValues,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    updateFilters(data, pathname)
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
                      {sizes.map((size) => (
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
