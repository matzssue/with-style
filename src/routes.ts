export const publicRoutes = ['/', '/cart', '/auth/new-verification']
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
]
export const privateRoutes = ['/user', '/settings', '/payment']
export const dynamicRoutes = [
  '/products',
  '/man',
  '/woman',
  '/accesories',
  '/shoes',
  '/user',
]
export const adminRoute = ['/admin', '/api/admin']
export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/'
