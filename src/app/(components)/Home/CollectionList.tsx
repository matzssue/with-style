import { getProductsBySubcategory } from '@/data/products/get-products'
import { HomeProductList } from './HomeProductList'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading/Loading'

export const CollectionList = async ({
  subcategory,
}: {
  subcategory: string
}) => {
  const { data: products } = await getProductsBySubcategory(subcategory, 3)

  return (
    <Suspense fallback={<Loading />}>
      <ul className='flex flex-wrap justify-center gap-5 px-6 '>
        {products.map((product) => (
          <HomeProductList key={product.id} {...product} />
        ))}
      </ul>
    </Suspense>
  )
}
