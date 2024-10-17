import authConfig from '@/auth.config'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoute,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
} from './routes'
import { getToken } from 'next-auth/jwt'

export default auth(async (req) => {
  const { nextUrl } = req
  if (!process.env.AUTH_SECRET) {
    throw new Error('AUTH_SECRET is not defined in environment variables.')
  }
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
    salt:
      process.env.NODE_ENV === 'production'
        ? '__Secure-authjs.session-token'
        : 'authjs.session-token',
  })

  const userRole = token?.role

  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isAdminRoute = adminRoute.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  const isPrivateRoute = privateRoutes.some((path) =>
    nextUrl.pathname.startsWith(path)
  )

  if (isAdminRoute) {
    if (userRole === 'ADMIN') return
    else {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
  }

  if (isApiAuthRoute) {
    return
  }

  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  return
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
