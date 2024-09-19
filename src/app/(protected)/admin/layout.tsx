import Image from 'next/image'
import Logo from '@images/Logo.png'

import Link from 'next/link'
import { adminNavList } from '@/constants/navlist'
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <RoleGate allowedRole='ADMIN'>

    <>
      <header className='flex min-h-[100px] bg-neutral-100 '>
        <Image
          className='max-md:hidden'
          alt='logo'
          height={250}
          width={350}
          src={Logo}
        />
        <nav className='flex w-full items-center justify-start pl-5  max-md:pl-0'>
          <ul className='flex h-full items-center justify-center gap-10 max-md:flex-wrap max-md:p-4 '>
            {adminNavList.map(({ link, title, icon }) => (
              <li
                key={link + title}
                className='flex gap-5 text-2xl font-bold max-md:text-lg'
              >
                <Link
                  className=' flex gap-2 hover:text-secondary hover:underline'
                  href={link}
                >
                  {icon} {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className='mx-4 my-5 flex h-full flex-col items-center justify-center'>
        {children}
      </main>
    </>

    // </RoleGate>
  )
}
