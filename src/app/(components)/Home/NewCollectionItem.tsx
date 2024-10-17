import { ButtonLink } from '@/components/Buttons/ButtonLink'
import { publicRoutes } from '@/routes'
import { CollectionList } from './CollectionList'
import { Subcategory } from '@/constants/categories'

export type CollectionLinkList = {
  link: string
  title: string
}

export const NewCollectionItem = ({
  list,
  subcategory,
}: {
  list: CollectionLinkList[]
  subcategory: Subcategory
}) => {
  return (
    <div className='flex flex-col items-center gap-y-5 max-lg:py-6'>
      <p className='text-4xl font-bold text-primary'>
        New {subcategory.toLowerCase()} collection
      </p>
      <div className='flex gap-2'>
        {list.map(({ link, title }) => (
          <ButtonLink
            key={title}
            href={`/${publicRoutes.products}/${link}?subcategory=${subcategory}`}
          >
            {title}
          </ButtonLink>
        ))}
      </div>
      <CollectionList subcategory={subcategory} />
    </div>
  )
}
