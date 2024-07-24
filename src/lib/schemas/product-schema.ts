import { ProductCategory, ProductType } from '@prisma/client'
import { z } from 'zod'

export type ProductSchema = z.infer<typeof productSchema>

const categories = z.nativeEnum(ProductCategory)
const types = z.nativeEnum(ProductType)

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(15),
  price: z.number().min(1).max(10000),
  category: categories,
  subcategory: z.string().min(3).max(20).nullable(),
  imgUrl: z.string().min(3).max(200),
  type: types,
})
