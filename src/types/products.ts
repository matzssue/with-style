import { Product } from '@prisma/client'

export type ProductsData = {
  data: Product[]
  metadata: {
    totalPages: number
  }
}
