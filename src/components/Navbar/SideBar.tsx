'use client'

import { cn } from '@/lib/utils'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

import {
  accessoriesNavLinks,
  manNavLinks,
  shoesNavLinks,
  womanNavLinks,
} from '@/constants/navlist'
import { useSidebarStore } from '@/store/useSidebarStore'

export default function SideBar() {
  const isOpen = useSidebarStore((state) => state.isOpen)

  return (
    <Accordion
      type='single'
      collapsible
      className={`fixed left-0  z-[100] flex h-screen w-full max-w-64 flex-col gap-4 bg-accent p-6 shadow-md transition-all duration-200 ease-in-out lg:hidden ${
        isOpen ? 'fixed left-0 top-0 translate-x-0' : '-translate-x-full'
      }`}
    >
      <AccordionItem
        className='border-b-0 px-2 py-5 text-3xl font-bold'
        value='item-1'
      >
        <Link href={'/'}>Home</Link>
      </AccordionItem>
      <AccordionItem className='border-b-0' value='item-1'>
        <AccordionTrigger
          className={cn(
            'rounded-md bg-neutral-100 p-0 px-2 py-2 text-2xl font-semibold  hover:no-underline'
          )}
        >
          Man
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            'flex flex-col gap-2 bg-slate-50 bg-opacity-30 px-2 py-2 text-lg font-semibold'
          )}
        >
          {manNavLinks.map(({ link, title }) => (
            <Link key={title} href={`/products/man/${link}`}>
              {title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className='border-b-0' value='item-2'>
        <AccordionTrigger
          className={cn(
            'rounded-md bg-neutral-100 p-0 px-2 py-2 text-2xl font-semibold  hover:no-underline'
          )}
        >
          Woman
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            'flex flex-col gap-2 bg-slate-50 bg-opacity-30 px-2 py-2 text-lg font-semibold'
          )}
        >
          {womanNavLinks.map(({ link, title }) => (
            <Link key={title} href={`/products/woman/${link}`}>
              {title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className='border-b-0' value='item-3'>
        <AccordionTrigger
          className={cn(
            'rounded-md bg-neutral-100 p-0 px-2 py-2 text-2xl font-semibold  hover:no-underline'
          )}
        >
          Shoes
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            'flex flex-col gap-2 bg-slate-50 bg-opacity-30 px-2 py-2 text-lg font-semibold'
          )}
        >
          {shoesNavLinks.map(({ link, title }) => (
            <Link key={title} href={`/products/shoes/${link}`}>
              {title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className='border-b-0' value='item-4'>
        <AccordionTrigger
          className={cn(
            'rounded-md bg-neutral-100 p-0 px-2 py-2 text-2xl font-semibold  hover:no-underline'
          )}
        >
          Accesories
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            'flex flex-col gap-2 bg-slate-50 bg-opacity-30 px-2 py-2 text-lg font-semibold'
          )}
        >
          {accessoriesNavLinks.map(({ link, title }) => (
            <Link key={title} href={`/products/accessories/${link}`}>
              {title}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
