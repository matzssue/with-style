'use client'

import { cn } from '@/lib/utils'

import { Accordion, AccordionItem } from '@/components/ui/accordion'
import Link from 'next/link'

import { useSidebarStore } from '@/store/useSidebarStore'
import { publicRoutes } from '@/routes'
import { CustomAccordionItem } from '../Accordion/CustomAccordionItem'
import { sidebarNavigation } from '@/constants/sidebar-navigation'

export default function SideBar() {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const controlSiebar = useSidebarStore((state) => state.toggleNavigation)

  return (
    <Accordion
      type='single'
      collapsible
      className={`fixed left-0  z-[100] flex h-screen w-full max-w-64 flex-col gap-4 bg-accent p-6 shadow-md transition-all duration-200 ease-in-out lg:hidden ${
        isOpen
          ? 'fixed left-0 top-0 translate-x-0'
          : 'left-0 top-0 -translate-x-full'
      }`}
    >
      <AccordionItem
        className='border-b-0 px-2 py-5 text-3xl font-bold'
        value='item-1'
      >
        <button onClick={() => controlSiebar()}>
          <Link href={'/'}>Home</Link>
        </button>
      </AccordionItem>

      {sidebarNavigation.map(({ navigation, title, value, mainLink }) => (
        <CustomAccordionItem
          key={title + value}
          title={title}
          value={value}
          triggerCn={cn(
            'rounded-md bg-neutral-100 p-0 px-2 py-2 text-2xl font-semibold  hover:no-underline'
          )}
          contentCn={cn(
            'flex flex-col gap-2 bg-slate-50 bg-opacity-30 px-2 py-2 text-lg font-semibold'
          )}
          itemCn={cn('border-bn-0')}
        >
          {navigation.map(({ link, title }) => (
            <button key={title} onClick={() => controlSiebar()}>
              <Link href={`/${publicRoutes.products}/${mainLink}/${link}`}>
                {title}
              </Link>
            </button>
          ))}
        </CustomAccordionItem>
      ))}
    </Accordion>
  )
}
