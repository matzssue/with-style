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
import { useCurrentUser } from '@/hooks/use-current-user'
import { User } from 'next-auth'

export const UserMenu = ({ user }: { user: User | undefined }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='h-9 w-9 cursor-pointer hover:scale-105'>
          <AvatarImage alt='@shadcn' src={user?.image || ''} />
          <AvatarFallback>
            <CircleUserRound />
          </AvatarFallback>
          <span className='sr-only'>Toggle user menu</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className='underline' href='/settings'>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className='underline' href='/user/orders'>
            My orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className='underline' href='/user/wishlist'>
            Wishlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => signOut()}
            className={cn('hover:bg-slate-50')}
            variant='outline'
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
