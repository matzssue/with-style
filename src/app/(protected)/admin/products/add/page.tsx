import { ProductList } from '@/app/(withNavbar)/products/(components)/ProductsList'
import { Paginator } from '@/components/Paginator/Paginator'
import { getProducts } from '@/data/products/get-products'
import { AddProductForm } from '../../(components)/AddProductForm'

export default async function ProductsAdmin() {
  return (
    <div>
      <AddProductForm />
    </div>
  )
}
