import Link from 'next/link';

type CategoryCard = {
  links: LinksProps[];
  categoryTitle: string;
};

type LinksProps = {
  title: string;
  link: string;
};

export const CategoryCard = ({ links, categoryTitle }: CategoryCard) => {
  return (
    <div className='flex w-auto flex-col p-5'>
      <p className='bg-neutral-200 p-5 text-3xl font-bold'>{categoryTitle}</p>
      <ul className='flex flex-row flex-wrap justify-between gap-1 py-5'>
        {links.map(({ link, title }) => (
          <li
            key={link + title}
            className='w-36 rounded-sm bg-black bg-opacity-85 px-3 py-1 text-white hover:bg-opacity-100'
          >
            <Link className='block' href={link}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
