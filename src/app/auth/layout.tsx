import { ReactNode } from 'react'
import Logo from '@images/Logo.png'
import Image from 'next/image'
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-secondary px-2 py-4'>
      <header>
        <Image alt='logo' src={Logo} />
      </header>
      <div className='mx-5 flex h-full w-full max-w-[650px] flex-col gap-y-5 rounded-md bg-neutral-100 p-10 shadow-lg'>
        {children}
      </div>
    </div>
  )
}
