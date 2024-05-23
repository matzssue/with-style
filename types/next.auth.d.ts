import NextAuth, { DefaultSession, Token } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'
import { DefaultJWT } from 'next-auth/jwt'
import { UserRole } from '@prisma/client'
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: UserRole
  }
}
