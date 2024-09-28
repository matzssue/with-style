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
import { useEffect, useMemo, useState } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'
import { updateFilters } from '@/actions/products/filter-products'
import {
  FilterProductsSchema,
  filterProductsSchema,
} from '@/lib/schemas/filter-schema'
import { Checkbox } from '@/components/ui/checkbox'
import { getSubcategoryTitles } from '@/data/products/get-subcategories'

type PriceFilter = {
  min: number
  max: number
}

const minPrice = 0
const maxPrice = 500
const defaultSize = 'ALL'
const defaultSubcategory = 'ALL'
const defaultPromotions = false

const defaultFormValues = {
  size: defaultSize,
  price: [minPrice, maxPrice],
}

export const FilterForm = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [productsType, setProductsType] = useState<string[] | null>(null)
  const [subcategories, setSubcategories] = useState<string[]>([])
  const [error, setError] = useState<string | null>()

  const [priceFilter, setPriceFilter] = useState<PriceFilter | null>({
    min: defaultFormValues.price[0],
    max: defaultFormValues.price[1],
  })

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const data: string[] = await getSubcategoryTitles()
        setSubcategories([defaultSubcategory, ...data])
      } catch (err) {
        setError('Error fetching subcategory titles')
      }
    }

    fetchSubcategories()
  }, [])

  const selectedSubcategory =
    searchParams.get('subcategory')?.toUpperCase() || defaultSubcategory

  const isPromotionsSelected =
    !!searchParams.get('promotions') || defaultPromotions

  const shoesSizeData = useMemo(
    () => shoesSize.map((size) => size.toString()),
    []
  )

  useEffect(() => {
    if (pathname.includes('shoes')) {
      setProductsType(shoesSizeData)
    } else if (pathname.includes('accessories')) {
      setProductsType(null)
    } else {
      setProductsType(sizes)
    }
  }, [pathname])

  const form = useForm<FilterProductsSchema>({
    resolver: zodResolver(filterProductsSchema),
    defaultValues: {
      ...defaultFormValues,
      subcategory: selectedSubcategory,
      promotions: isPromotionsSelected,
    },
  })

  function onSubmit(data: FilterProductsSchema) {
    const minPrice =
      data.price[0] !== defaultFormValues.price[0]
        ? data.price[0].toString()
        : null
    const maxPrice =
      data.price[1] !== defaultFormValues.price[1]
        ? data.price[1].toString()
        : null
    const size = data.size
    const sortByPrice = searchParams.get('sortByPrice')
    const subcategory = data.subcategory ?? searchParams.get('subcategory')
    const promotions = data.promotions ? 'true' : null

    const fitlerData = {
      minPrice,
      maxPrice,
      size: size !== defaultSize ? size : null,
      sortByPrice,
      promotions,
      subcategory: subcategory !== defaultSubcategory ? subcategory : null,
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
            name='subcategory'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Select collection' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Collections</SelectLabel>
                      {subcategories &&
                        subcategories.map((size) => (
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
                      <SelectItem key={defaultSize} value={defaultSize}>
                        {defaultSize}
                      </SelectItem>
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
                    min={minPrice}
                    max={maxPrice}
                    step={20}
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
          <FormField
            control={form.control}
            name='promotions'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md py-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Only promotions</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {error && <p>{error}</p>}
          <Button className='m-auto w-1/2' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
