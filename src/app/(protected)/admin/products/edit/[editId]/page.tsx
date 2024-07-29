import { ProductList } from '@/app/(withNavbar)/products/(components)/ProductsList'
import { Paginator } from '@/components/Paginator/Paginator'
import { getProduct } from '@/data/products/get-product'
import { getProducts } from '@/data/products/get-products'
import { useSearchParams } from 'next/navigation'
import { EditProductForm } from '../../../(components)/EditProductForm'

import prisma from '@/lib/prisma'

export default async function EditProduct({ params }) {
  const productId = params.editId
  const product = await getProduct(productId)
  console.log(product, 'product')
  return (
    <div>
      <EditProductForm product={product} />
    </div>
  )
}
