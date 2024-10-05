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
    bgImage: 'man-category-image.jpg',
    category: 'man',
    links: manNavLinks,
  },
  {
    title: 'For woman',
    bgImage: 'woman-category-image.jpg',
    category: 'woman',
    links: womanNavLinks,
  },
  {
    title: 'Shoes',
    bgImage: 'shoes.jpg',
    category: 'shoes',
    links: shoesNavLinks,
  },
  {
    title: 'accessiores',
    bgImage: 'accessories.jpg',
    category: 'accessories',
    links: accessoriesNavLinks,
  },
]
