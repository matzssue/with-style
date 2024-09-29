import { z } from 'zod'

export type SortProductsSchema = z.infer<typeof sortProductsSchema>

export const sortProductsSchema = z.object({
  sortByPrice: z.enum(['asc', 'desc', '']),
})
