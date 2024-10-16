import { ProductCategory, ProductType } from '@prisma/client'
import { z } from 'zod'

export type ProductSchema = z.infer<typeof productSchema>

const categories = z.nativeEnum(ProductCategory)
const types = z.nativeEnum(ProductType)

export const productSchema = z.object({
  id: z.string().min(3).optional(),
  name: z.string().min(3).max(15),
  price: z.number().positive('Price must be a positive number'),
  category: categories,
  subcategory: z.string().nullable(),
  imgUrl: z.string().url('Invalid URL format'),
  type: types,
  size: z.array(z.string()).optional(),
  discountPercentage: z.number().nullable(),
})
