import { ReactNode } from 'react'

export const CardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col rounded-sm bg-neutral-100 px-6  py-2 shadow-md  max-lg:items-center'>
      {children}
    </div>
  )
}
