import { Subcategory } from '@/constants/categories'
import { fetchData } from '@/lib/helplers/fetchData'
import { publicRoutes } from '@/routes'

export const getSubcategoryTitles = async () => {
  const subcategoryTitles = await fetchData<Subcategory[]>(
    `api/${publicRoutes.products}/subcategory/titles`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return subcategoryTitles
}
