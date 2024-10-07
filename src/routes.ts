export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
]
export const privateRoutes = ['/user']

export const adminRoute = ['/admin', '/api/admin']
export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/'

export const publicRoutes = {
  product: 'product',
  products: 'products',
}

export const adminRoutes = {
  default: 'admin',
  products: 'admin/products',
}
export const userRoutes = {
  default: 'user',
  orderDetails: 'user/order-details',
  payment: 'user/payment',
}
