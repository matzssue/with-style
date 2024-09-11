import { ProductCategory, ProductType, Size } from '@prisma/client'
import { z } from 'zod'

export type ProductSchema = z.infer<typeof productSchema>
export type AddProductSchema = z.infer<typeof addProductSchema>

const categories = z.nativeEnum(ProductCategory)
const types = z.nativeEnum(ProductType)
const sizes = z.nativeEnum(Size)

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(15),
  price: z.number().min(1).max(10000),
  category: categories,
  subcategory: z.string().min(3).max(20).nullable(),
  imgUrl: z.string().min(3).max(200),
  type: types,
})

export const addProductSchema = z.object({
  name: z.string().min(3).max(15),
  price: z.number().positive('Price must be a positive number'),
  category: categories,
  subcategory: z.string().nullable(),
  imgUrl: z.string().url('Invalid URL format'),
  type: types,
  size: z.array(sizes).optional(),
})
