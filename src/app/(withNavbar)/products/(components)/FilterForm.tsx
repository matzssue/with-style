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

import { shoesSize, sizes } from '@/constants/sizes'
import { useEffect, useMemo, useState } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'
import { updateFilters } from '@/actions/products/filter-products'
import {
  FilterProductsSchema,
  filterProductsSchema,
} from '@/lib/schemas/filter-schema'
import { getSubcategoryTitles } from '@/data/products/get-subcategories'
import {
  defaultPromotions,
  defaultSize,
  defaultSubcategory,
  defaultPrice,
} from '@/constants/filters'
import { FormFieldSelect } from '@/components/Inputs/FormFieldSelect'
import { FormFieldCheckbox } from '@/components/Inputs/FormFieldCheckbox'

type PriceFilter = {
  min: number
  max: number
}

const defaultFormValues = {
  size: defaultSize,
  price: [defaultPrice.minPrice, defaultPrice.maxPrice],
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
      setProductsType([defaultSize, ...shoesSizeData])
    } else if (pathname.includes('accessories')) {
      setProductsType([defaultSize])
    } else {
      setProductsType([defaultSize, ...sizes])
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
          <FormFieldSelect<FilterProductsSchema>
            control={form.control}
            label='Collection'
            name='subcategory'
            selectItems={subcategories}
            placeholder='Select collection'
            triggerClassname='w-[180px]'
          />

          <FormFieldSelect<FilterProductsSchema>
            control={form.control}
            label='Size'
            name='size'
            selectItems={productsType ?? []}
            placeholder='Select size'
            triggerClassname='w-[180px]'
          />

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
                    min={defaultPrice.minPrice}
                    max={defaultPrice.maxPrice}
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
          <FormFieldCheckbox<FilterProductsSchema>
            control={form.control}
            label='Only promotions'
            name='promotions'
            className='flex flex-row items-start space-x-3 space-y-0 rounded-md py-4'
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
