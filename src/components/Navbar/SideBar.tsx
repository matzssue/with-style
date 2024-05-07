import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { NavLink } from './NavBar';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { clothingNavLinks, shoesNavLinks } from '@/constants/navlist';
export default function SideBar({ isOpen }) {
  return (
    <Accordion
      type='single'
      collapsible
      className={`fixed left-0 top-[100px] flex h-screen   min-w-64 flex-col bg-accent p-6 transition-all duration-200 ease-in-out lg:hidden ${
        isOpen ? 'fixed left-0 top-0 translate-x-0' : '-translate-x-full'
      }`}
    >
      <AccordionItem className='border-b-0' value='item-1'>
        <NavLink href={'/'}>Home</NavLink>
      </AccordionItem>
      <AccordionItem className='border-b-0' value='item-1'>
        <AccordionTrigger
          className={cn('p-0 hover:bg-accent hover:no-underline')}
        >
          Clothing
        </AccordionTrigger>
        <AccordionContent className={cn('flex flex-col')}>
          {clothingNavLinks.map(({ link, title }) => (
            <NavLink key={title} href={link}>
              {title}
            </NavLink>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className='border-b-0' value='item-2'>
        <AccordionTrigger
          className={cn('p-0 hover:bg-accent hover:no-underline')}
        >
          Shoes
        </AccordionTrigger>
        <AccordionContent className={cn('flex flex-col')}>
          {shoesNavLinks.map(({ link, title }) => (
            <NavLink key={title} href={link}>
              {title}
            </NavLink>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className='border-b-0' value='item-3'>
        <AccordionTrigger
          className={cn('p-0 hover:bg-accent hover:no-underline')}
        >
          Accesories
        </AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
