import Image from 'next/image'
import Logo from '@images/Logo.png'
import UserBar from '../UserBar/UserBar'

export default function Header({
  staticNavigation,
}: {
  staticNavigation: React.ReactNode
}) {
  return (
    <header className='sticky top-0 z-50  flex w-full flex-col'>
      <div className='top-0 flex  flex-row justify-between bg-white'>
        <Image
          className=''
          src={Logo}
          style={{ minHeight: '80px', zIndex: '100' }}
          height={200}
          width={300}
          alt='logo'
        />

        {staticNavigation}
      </div>
      <UserBar />
    </header>
  )
}
