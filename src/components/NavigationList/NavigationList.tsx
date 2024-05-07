import Link from 'next/link';
import { ReactNode } from 'react';

type NavigationListProps = {
  link: string;
  title: string;
  icon: ReactNode;
};

export const NavigationList = ({ list }: { list: NavigationListProps[] }) => {
  return (
    <>
      {list.map(({ link, title, icon }) => (
        <li className='hover:bg-secondary'>
          <Link className='flex flex-row items-center gap-x-2 p-1' href={link}>
            {icon} {title}
          </Link>
        </li>
      ))}
    </>
  );
};
