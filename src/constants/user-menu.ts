import { userRoutes } from '@/routes'

export const userMenu = [
  {
    link: userRoutes.settings,
    title: 'Settings',
  },
  {
    link: userRoutes.orders,
    title: 'Orders',
  },
  {
    link: userRoutes.wishlist,
    title: 'Wishlist',
  },
] as const
