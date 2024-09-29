import { getProduct } from '@/data/products/get-product'

import { EditProductForm } from '../../../(components)/EditProductForm'

export default async function EditProduct({
  params,
}: {
  params: { editId: string }
}) {
  const productId = params.editId
  const product = await getProduct(productId)

  return <EditProductForm product={product} />
}
