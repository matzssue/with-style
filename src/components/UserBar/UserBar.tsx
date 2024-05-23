'use client'

import Searchbar from '../Searchbar/Searchbar'

import { UserMenu } from '../Auth/UserMenu'
import { ShoppingBag } from '../ShoppingBag/ShoppingBag'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function UserBar() {
  const { data: isLoggenIn } = useSession()

  return (
    <div className='flex flex-row justify-between bg-neutral-100 p-5'>
      <Searchbar />
      <div className='flex items-center justify-between gap-8 align-middle '>
        <ShoppingBag />
        {isLoggenIn ? (
          <UserMenu />
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
