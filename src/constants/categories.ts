import { ProductCategory } from '@prisma/client'
import {
  accessoriesNavLinks,
  manNavLinks,
  shoesNavLinks,
  womanNavLinks,
} from './navlist'

export const categories: ProductCategory[] = [
  'SHOES',
  'MAN',
  'WOMAN',
  'ACCESSORIES',
]

export const categoryCardsList = [
  {
    title: 'For man',
    bgImage: '/images/man-category-image.webp',
    category: 'man',
    links: manNavLinks,
  },
  {
    title: 'For woman',
    bgImage: '/images/woman-category-image.webp',
    category: 'woman',
    links: womanNavLinks,
  },
  {
    title: 'Shoes',
    bgImage: '/images/shoes.webp',
    category: 'shoes',
    links: shoesNavLinks,
  },
  {
    title: 'accessiores',
    bgImage: '/images/accessories.webp',
    category: 'accessories',
    links: accessoriesNavLinks,
  },
]

export const subcategories = {
  sport: 'SPORT',
  new: 'NEW',
  summer: 'SUMMER',
  top: 'TOP',
} as const
export type Subcategory = (typeof subcategories)[keyof typeof subcategories]
