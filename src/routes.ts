export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
]
export const privateRoutes = ['/user', '/api/user']

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
  product: 'admin/product',
  orders: 'admin/orders',
  orderDetails: 'admin/order-details',
  statistics: 'admin/statistics',
}
export const userRoutes = {
  default: 'user',
  orderDetails: 'user/order-details',
  payment: 'user/payment',
  settings: 'user/settings',
  orders: 'user/orders',
  wishlist: 'user/wishlist',
}
