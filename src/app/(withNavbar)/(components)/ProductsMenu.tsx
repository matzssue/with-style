'use client'

import {
  accessoriesNavLinks,
  manNavLinks,
  shoesNavLinks,
  womanNavLinks,
} from '@/constants/navlist'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { FilterForm } from './FilterForm'

type NavigationLinks = {
  title: string
  link: string
  icon?: ReactNode
}

export const ProductsMenu = () => {
  const param = useParams()
  const pathname = usePathname()
  const [categories, setCategories] = useState<NavigationLinks[] | ''>('')

  useEffect(() => {
    switch (param.categorySlug) {
      case 'man':
        setCategories(manNavLinks)
        break
      case 'woman':
        setCategories(womanNavLinks)
        break
      case 'shoes':
        setCategories(shoesNavLinks)
        break
      case 'accesories':
        setCategories(accessoriesNavLinks)
      default:
      // code block
    }
  }, [param.categorySlug])

  return (
    <div className='flex w-1/4 min-w-[300px] flex-col justify-start gap-5 border-r-2 bg-neutral-100 px-8 py-5 max-lg:w-full max-lg:border-r-0'>
      <div className='max-lg:hidden'>
        <p className='py-2 text-3xl font-bold'>Categories</p>
        <ul>
          {categories &&
            categories.map(({ link, title }) => (
              <li key={title}>
                <Link
                  className={
                    pathname === `/products/${param.categorySlug}/${link}` ||
                    pathname === `/products/${param.categorySlug}`
                      ? 'font-bold'
                      : ''
                  }
                  href={`/products/${param.categorySlug}/${link}`}
                >
                  {title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <hr />

      <FilterForm />
      <hr />
    </div>
  )
}
