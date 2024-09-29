import { UserMenu } from '../Auth/UserMenu'
import { ShoppingBag } from '../ShoppingBag/ShoppingBag'
import Link from 'next/link'

import { currentUser } from '@/lib/auth/auth'

export default async function UserBar() {
  const user = await currentUser()
  return (
    <div className='absolute right-0 top-[85px] w-full max-w-[140px] flex-row justify-end self-end rounded-bl-[60px] bg-neutral-100 p-5 shadow-md max-md:top-[65px] max-md:w-[110px] max-md:flex-col max-md:gap-y-5 max-md:pb-3 max-md:pr-2 max-md:pt-1 '>
      <div className='flex justify-end gap-5 align-middle  max-md:justify-end max-md:gap-3 '>
        <ShoppingBag />
        <UserMenu user={user} />
      </div>
    </div>
  )
}
