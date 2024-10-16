import Image from 'next/image'
import Logo from '@images/Logo.png'
import UserBar from '../UserBar/UserBar'
import Link from 'next/link'

export default function Header({
  staticNavigation,
}: {
  staticNavigation: React.ReactNode
}) {
  return (
    <header className='sticky top-0 z-50 flex h-[85px] w-full   flex-col max-md:h-[65px]'>
      <div className='top-0 flex h-full flex-row items-center justify-between bg-white px-1  py-2'>
        <Link className='flex h-full w-full' href='/'>
          <Image
            src={Logo}
            width={300}
            className='w-auto max-md:max-h-[130px] max-md:w-auto'
            height={300}
            alt='logo'
          />
        </Link>
        {staticNavigation}
      </div>
      <UserBar />
    </header>
  )
}
