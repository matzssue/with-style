import {
  manNavLinks,
  womanNavLinks,
  shoesNavLinks,
  accessoriesNavLinks,
} from '@/constants/navlist'

export const getLinksForCategory = (categorySlug: string) => {
  switch (categorySlug) {
    case 'man':
      return manNavLinks
    case 'woman':
      return womanNavLinks
    case 'shoes':
      return shoesNavLinks
    case 'accessories':
      return accessoriesNavLinks
    default:
      return []
  }
}
