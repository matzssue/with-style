'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

import Link from 'next/link'

import {
  accessoriesNavLinks,
  manNavLinks,
  womanNavLinks,
  shoesNavLinks,
} from '@/constants/navlist'
import { NavigationList } from '../NavigationList/NavigationList'
import { useSidebarStore } from '@/store/useSidebarStore'
import { Menu } from 'lucide-react'

export function NavBar() {
  const toggleSidebar = useSidebarStore((state) => state.toggleNavigation)

  return (
    <>
      <button className='pr-2 lg:hidden' onClick={() => toggleSidebar()}>
        <Menu />
      </button>
      <NavigationMenu className='hidden lg:flex '>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/' legacyBehavior passHref>
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
              Woman
            </NavigationMenuTrigger>
            <NavigationMenuContent className='z-50'>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                <NavigationList category='woman' list={womanNavLinks} />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger style={{ fontSize: '24px' }}>
              Man
            </NavigationMenuTrigger>
            <NavigationMenuContent className='z-50'>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                <NavigationList category='man' list={manNavLinks} />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger style={{ fontSize: '24px' }}>
              Shoes
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                <NavigationList category='shoes' list={shoesNavLinks} />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger style={{ fontSize: '24px' }}>
              Accessories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                <NavigationList
                  category='accessories'
                  list={accessoriesNavLinks}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}
