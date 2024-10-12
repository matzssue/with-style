'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { FilterForm } from './FilterForm'
import { publicRoutes } from '@/routes'

type NavigationLinks = {
  title: string
  link: string
  icon?: ReactNode
}

export const ProductsMenu = ({
  categories,
  categorySlug,
}: {
  categories: NavigationLinks[]
  categorySlug: string
}) => {
  const pathname = usePathname()

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
                    pathname ===
                      `/${publicRoutes.products}/${categorySlug}/${link}` ||
                    (pathname === `/${publicRoutes.products}/${categorySlug}` &&
                      title.toLowerCase() === 'all')
                      ? 'font-bold'
                      : ''
                  }
                  href={`/${publicRoutes.products}/${categorySlug}/${link}`}
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
