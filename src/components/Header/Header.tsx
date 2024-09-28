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
    <header className='sticky top-0 z-50 flex h-[85px] w-full   flex-col max-md:h-[70px]'>
      <div className='top-0 flex h-full flex-row items-center justify-between  bg-white'>
        <Link href='/'>
          <Image
            layout='responsive'
            src={Logo}
            width={300}
            height={300}
            style={{ minHeight: '60px' }}
            alt='logo'
          />
        </Link>
        {staticNavigation}
      </div>
      <UserBar />
    </header>
  )
}
