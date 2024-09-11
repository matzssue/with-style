'use client'

import { deleteProduct } from '@/actions/products/delete-product'
import { Button } from '@/components/ui/button'

export const DeleteProductButton = ({ productId }: { productId: string }) => {
  const deleteProductHandler = async () => {
    await deleteProduct(productId)
  }

  return (
    <form action={deleteProductHandler}>
      <Button type='submit'> Delete</Button>
    </form>
  )
}
