import Searchbar from '../Searchbar/Searchbar'
import { UserMenu } from '../Auth/UserMenu'
import { ShoppingBag } from '../ShoppingBag/ShoppingBag'
import Link from 'next/link'

import { currentUser } from '@/lib/auth/auth'

export default async function UserBar() {
  const user = await currentUser()
  return (
    // <div className='flex w-full max-w-[150px] flex-row justify-end self-end rounded-bl-[60px] bg-neutral-100 p-5  max-md:flex-col max-md:gap-y-5'>
    <div className=' absolute right-0 top-20 max-w-[150px] flex-row justify-end self-end rounded-bl-[60px] bg-neutral-100 p-5  max-md:flex-col max-md:gap-y-5'>
      <div className='flex justify-end gap-8  align-middle max-md:justify-center '>
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
