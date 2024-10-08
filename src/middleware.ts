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

export default auth((req) => {
  const { nextUrl } = req

  const userRole = req.auth?.user.role
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isAdminRoute = adminRoute.includes(nextUrl.pathname)

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

  if (isPrivateRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL('/auth/login', nextUrl))
    }
    return
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
