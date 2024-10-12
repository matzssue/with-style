'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import Link from 'next/link'

import { CircleUserRound } from 'lucide-react'

import { cn } from '@/lib/utils'

import { signOut } from 'next-auth/react'

import { User } from 'next-auth'
import { userMenu } from '@/constants/user-menu'

export const UserMenu = ({ user }: { user: User | undefined }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='h-9 w-9 cursor-pointer hover:scale-105'>
          <AvatarImage alt='user image' src={user?.image || ''} />
          <AvatarFallback>
            <CircleUserRound />
          </AvatarFallback>
          <span className='sr-only'>Toggle user menu</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-md:min-w-[150px]'>
        <DropdownMenuLabel className='max-md:text-lg'>
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <>
            {userMenu.map(({ link, title }) => (
              <DropdownMenuItem key={title}>
                <Link className='underline max-md:text-lg' href={`/${link}`}>
                  {title}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
              <Button
                onClick={() => signOut()}
                className={cn('text-lg hover:bg-slate-50')}
                variant='outline'
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Button className='w-full' asChild>
              <Link href={'/auth/login'}>Login </Link>
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
