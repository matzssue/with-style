import {
  accessoriesNavLinks,
  manNavLinks,
  shoesNavLinks,
  womanNavLinks,
} from './navlist'

export const sidebarNavigation = [
  {
    title: 'Man',
    value: 'item-1',
    navigation: manNavLinks,
    mainLink: 'man',
  },
  {
    title: 'Woman',
    value: 'item-2',
    navigation: womanNavLinks,
    mainLink: 'woman',
  },
  {
    title: 'Shoes',
    value: 'item-3',
    navigation: shoesNavLinks,
    mainLink: 'shoes',
  },
  {
    title: 'Accessories',
    value: 'item-4',
    navigation: accessoriesNavLinks,
    mainLink: 'accessories',
  },
]
