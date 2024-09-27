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
    <header className='sticky top-0 z-50  flex w-full flex-col'>
      <div className='top-0 flex  flex-row justify-between bg-white'>
        <Link href='/'>
          <Image
            className=''
            src={Logo}
            style={{ minHeight: '70px', zIndex: '100', width: 'auto' }}
            height={200}
            width={300}
            alt='logo'
          />
        </Link>
        {staticNavigation}
      </div>
      <UserBar />
    </header>
  )
}
