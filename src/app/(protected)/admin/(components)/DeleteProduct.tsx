'use client'

import { deleteProduct } from '@/actions/products/delete-product'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const DeleteProductButton = ({ productId }: { productId: string }) => {
  const router = useRouter()

  const deleteProductHandler = async () => {
    const deletedProduct = await deleteProduct(productId)
    if (deletedProduct.success) {
      toast('Product successfully deleted')
      router.push('/admin/products')
    }
  }

  return (
    <form action={deleteProductHandler}>
      <Button type='submit'> Delete</Button>
    </form>
  )
}
