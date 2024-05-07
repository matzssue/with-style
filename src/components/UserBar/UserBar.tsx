import Searchbar from '../Searchbar/Searchbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { BasketIcon } from '../../../public/icons/BasketIcon';
import Image from 'next/image';
import shoes from '../../../public/shoes1.jpg';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

export default function UserBar() {
  return (
    <div className='flex flex-row justify-between bg-neutral-100 p-5'>
      <Searchbar />
      <div className='flex items-center justify-between gap-8 align-middle '>
        <button onClick={() => signOut()}>Logout</button>
        <Popover>
          <PopoverTrigger className='hover:scale-105'>
            <BasketIcon />
          </PopoverTrigger>
          <PopoverContent className={cn('w-full  p-0')}>
            <Card className={cn('border-0')}>
              <CardHeader>
                <CardTitle>Bag</CardTitle>
                <CardDescription>your products</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='max-h-60 overflow-y-scroll'>
                  <li className='flex gap-5 border-b-2 py-5'>
                    <Image height={50} alt='basket item' src={shoes} />
                    <div>
                      <p className='font-semibold'>Buty addidas najnowsze</p>
                      <p>
                        <span className='font-semibold'>Size:</span> 25
                      </p>
                      <p>
                        <span className='font-semibold'>Queantity:</span> 1
                      </p>
                    </div>
                  </li>
                  <li className='flex gap-5 border-b-2 py-5'>
                    <Image height={50} alt='basket item' src={shoes} />
                    <div>
                      <p className='font-semibold'>Buty addidas najnowsze</p>
                      <p>
                        <span className='font-semibold'>Size:</span> 25
                      </p>
                      <p>
                        <span className='font-semibold'>Queantity:</span> 1
                      </p>
                    </div>
                  </li>
                  <li className='flex gap-5 border-b-2 py-5'>
                    <Image height={50} alt='basket item' src={shoes} />
                    <div>
                      <p className='font-semibold'>Buty addidas najnowsze</p>
                      <p>
                        <span className='font-semibold'>Size:</span> 25
                      </p>
                      <p>
                        <span className='font-semibold'>Queantity:</span> 1
                      </p>
                    </div>
                  </li>
                  <li className='flex gap-5 border-b-2 py-5'>
                    <Image height={50} alt='basket item' src={shoes} />
                    <div>
                      <p className='font-semibold'>Buty addidas najnowsze</p>
                      <p>
                        <span className='font-semibold'>Size:</span> 25
                      </p>
                      <p>
                        <span className='font-semibold'>Queantity:</span> 1
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className={cn('flex flex-col items-start gap-2')}>
                <p>
                  <span className='font-semibold'>Total amount</span> : 350PLN
                </p>
                <p>
                  <span className='font-semibold'>Items</span>: 5
                </p>
                <Link
                  href='#'
                  className='my-2 w-full  bg-secondary px-5 py-2 text-center text-white hover:opacity-90'
                >
                  Go to bag
                </Link>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='h-9 w-9 cursor-pointer hover:scale-105'>
              <AvatarImage alt='@shadcn' src='https://github.com/shadcn.png' />
              <AvatarFallback>JP</AvatarFallback>
              <span className='sr-only'>Toggle user menu</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>@shadcn</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className='underline' href='#'>
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={undefined} variant='outline'>
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
