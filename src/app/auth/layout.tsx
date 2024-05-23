import { ReactNode } from 'react'
import Logo from '../../../public/Logo.png'
import Image from 'next/image'
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-secondary'>
      <header className=''>
        <Image alt='logo' src={Logo} />
      </header>
      <div className='flex w-1/3 flex-col gap-y-5 rounded-md bg-neutral-100 p-10 shadow-lg'>
        {children}
      </div>
    </div>
  )
}
