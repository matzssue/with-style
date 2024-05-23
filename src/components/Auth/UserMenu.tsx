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
import { useCurrentUser } from '@/hooks/use-current-user'
import { CircleUserRound } from 'lucide-react'

import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

export const UserMenu = () => {
  const user = useCurrentUser()

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
          <Link className='underline' href='/myorders'>
            My orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className='underline' href='/wishlist'>
            Wish list
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className={cn('hover:bg-slate-50')}
            onClick={() => signOut()}
            variant='outline'
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
