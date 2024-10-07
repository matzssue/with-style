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
    bgImage: '/images/man-category-image.jpg',
    category: 'man',
    links: manNavLinks,
  },
  {
    title: 'For woman',
    bgImage: '/images/woman-category-image.jpg',
    category: 'woman',
    links: womanNavLinks,
  },
  {
    title: 'Shoes',
    bgImage: '/images/shoes.jpg',
    category: 'shoes',
    links: shoesNavLinks,
  },
  {
    title: 'accessiores',
    bgImage: '/images/accessories.jpg',
    category: 'accessories',
    links: accessoriesNavLinks,
  },
]

export const subcategories = {
  sport: 'SPORT',
  new: 'NEW',
  summer: 'SUMMER',
  top: 'TOP',
}
