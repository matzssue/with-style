import Link from 'next/link'

type CategoryCard = {
  links: LinksProps[]
  categoryTitle: string
  category: string
}

type LinksProps = {
  title: string
  link: string
}

export const CategoryCard = ({
  links,
  categoryTitle,
  category,
}: CategoryCard) => {
  return (
    <div className='flex w-auto flex-col p-5'>
      <p className=' rounded-sm bg-primary p-5 text-3xl font-bold text-secondary shadow-lg'>
        {categoryTitle}
      </p>
      <ul className='flex flex-row flex-wrap justify-between gap-2 py-5 max-lg:justify-center '>
        {links.map(({ link, title }) => (
          <li
            key={link + title}
            className='w-36 rounded-sm bg-secondary bg-opacity-85 px-3 py-1 font-semibold text-neutral-100 shadow-md hover:bg-opacity-100'
          >
            <Link
              className='block rounded-sm  text-xl text-primary'
              href={`products/${category}/${link}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
