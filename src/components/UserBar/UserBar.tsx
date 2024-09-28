import { UserMenu } from '../Auth/UserMenu'
import { ShoppingBag } from '../ShoppingBag/ShoppingBag'
import Link from 'next/link'

import { currentUser } from '@/lib/auth/auth'

export default async function UserBar() {
  const user = await currentUser()
  return (
    <div className='absolute right-0 top-[85px] w-full max-w-[140px] flex-row justify-end self-end rounded-bl-[60px] bg-neutral-100 p-5 shadow-md max-md:top-[70px] max-md:w-[120px] max-md:flex-col max-md:gap-y-5 max-md:p-4 '>
      <div className='flex justify-end gap-5 align-middle  max-md:justify-end max-md:gap-3 '>
        <ShoppingBag />
        {user ? (
          <UserMenu user={user} />
        ) : (
          <Link
            href={'/auth/login'}
            className='rounded-sm bg-neutral-50 px-3 py-1  shadow-sm hover:scale-110 hover:bg-secondary hover:text-white'
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}
