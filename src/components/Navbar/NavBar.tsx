'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

import {
  accessoriesNavLinks,
  clothingNavLinks,
  shoesNavLinks,
} from '@/constants/navlist';
import { NavigationList } from '../NavigationList/NavigationList';
import { useSidebarStore } from '@/store/useSidebarStore';

export function NavBar() {
  const toggleSidebar = useSidebarStore((state) => state.toggleNavigation);

  return (
    <>
      <button className='lg:hidden' onClick={() => toggleSidebar()}>
        XXXXXXX
      </button>
      <NavigationMenu className='hidden lg:flex '>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/home' legacyBehavior passHref>
              <NavigationMenuLink
                style={{ fontSize: '24px' }}
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger style={{ fontSize: '24px' }}>
              Clothing
            </NavigationMenuTrigger>
            <NavigationMenuContent className='z-50'>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                <NavigationList list={clothingNavLinks} />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger style={{ fontSize: '24px' }}>
              Shoes
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                <NavigationList list={shoesNavLinks} />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger style={{ fontSize: '24px' }}>
              Accessories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                <NavigationList list={accessoriesNavLinks} />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href='/about-us' legacyBehavior passHref>
              <NavigationMenuLink
                style={{ fontSize: '24px' }}
                className={navigationMenuTriggerStyle()}
              >
                About Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
