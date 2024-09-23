import { z } from 'zod'

export type FilterProductsSchema = z.infer<typeof filterProductsSchema>

export const filterProductsSchema = z.object({
  size: z.string().optional(),
  price: z.number().array(),
  promotions: z.boolean().optional(),
  subcategory: z.string().optional(),
})
