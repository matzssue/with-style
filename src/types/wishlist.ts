import { Product } from '@prisma/client'

export type WishlistData = {
  data: Product[]
  metadata: {
    totalPages: number
  }
}
