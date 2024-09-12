import {
  PiTShirtLight,
  PiHoodieLight,
  PiPantsLight,
  PiDressLight,
  PiWatchLight,
  PiHandbagSimpleLight,
} from 'react-icons/pi'

import { GiLabCoat, GiBoots, GiBelt } from 'react-icons/gi'
import { FaRedhat } from 'react-icons/fa6'
import { LogOut } from 'lucide-react'
import { ProductCategory, ProductType } from '@prisma/client'
import { ReactNode } from 'react'

type LinksToProducts = {
  title: string
  link: ProductType | '/'
  icon?: ReactNode
}

export const manNavLinks: LinksToProducts[] = [
  {
    title: 'T-shirt',
    link: 'TSHIRT',
    icon: <PiTShirtLight />,
  },
  {
    title: 'Hoodie',
    link: 'HOODIE',
    icon: <PiHoodieLight />,
  },
  {
    title: 'Sweater',
    link: 'SWEATER',
    icon: <PiHoodieLight />,
  },
  {
    title: 'Coat',
    link: 'COAT',
    icon: <GiLabCoat />,
  },
  {
    title: 'Jeans',
    link: 'JEANS',
    icon: <PiPantsLight />,
  },
  {
    title: 'Sweatpants',
    link: 'SWEATPANTS',
    icon: <PiPantsLight />,
  },
  {
    title: 'Trousers',
    link: 'TROUSERS',
    icon: <PiPantsLight />,
  },
  { title: 'All', link: '/' },
]

export const womanNavLinks: LinksToProducts[] = [
  {
    title: 'T-shirt',
    link: 'TSHIRT',
    icon: <PiTShirtLight />,
  },
  {
    title: 'Hoodie',
    link: 'HOODIE',
    icon: <PiHoodieLight />,
  },
  {
    title: 'Sweater',
    link: 'SWEATER',
    icon: <PiHoodieLight />,
  },
  {
    title: 'Coat',
    link: 'COAT',
    icon: <GiLabCoat />,
  },
  {
    title: 'Dress',
    link: 'DRESS',
    icon: <PiDressLight />,
  },
  {
    title: 'Jeans',
    link: 'JEANS',
    icon: <PiPantsLight />,
  },
  {
    title: 'Sweatpants',
    link: 'SWEATPANTS',
    icon: <PiPantsLight />,
  },
  {
    title: 'Trousers',
    link: 'TROUSERS',
    icon: <PiPantsLight />,
  },
  { title: 'All', link: '/' },
]

export const shoesNavLinks: LinksToProducts[] = [
  {
    title: 'Sneakers',
    link: 'SNEAKERS',
    icon: <GiBoots />,
  },
  {
    title: 'Pumps',
    link: 'PUMPS',
    icon: <GiBoots />,
  },
  {
    title: 'Flat shoes',
    link: 'FLATSHOES',
    icon: <GiBoots />,
  },
  {
    title: 'Sport shoes',
    link: 'SPORTSHOES',
    icon: <GiBoots />,
  },
  { title: 'All', link: '/' },
]
export const accessoriesNavLinks: LinksToProducts[] = [
  {
    title: 'Watches',
    link: 'WATCH',
    icon: <PiWatchLight />,
  },
  {
    title: 'Belts',
    link: 'BELT',
    icon: <GiBelt />,
  },
  {
    title: 'Bags',
    link: 'BAG',
    icon: <PiHandbagSimpleLight />,
  },
  {
    title: 'Caps',
    link: 'CAP',
    icon: <FaRedhat />,
  },
  { title: 'All', link: '/' },
]

export const adminNavList = [
  { title: 'Statistics', link: '/admin' },
  { title: 'Products ', link: '/admin/products' },
  { title: 'Orders', link: '/admin/orders' },
  { title: 'Exit', link: '/', icon: <LogOut /> },
]
