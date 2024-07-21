import authConfig from './auth.config'
import { getuserById } from './data/user/user'
import prisma from './lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { getAccountByUserId } from './data/user/account'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true
      if (!user.id) return false
      const existingUser = await getuserById(user.id)

      if (!existingUser?.emailVerified) return false

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (session.user) {
        if (token.email) {
          session.user.email = token.email
        }
        session.user.name = token.name
        session.user.role = token.role
        session.user.isOauth = token.isOauth as boolean
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const user = await getuserById(token.sub)

      if (!user) return token

      const account = await getAccountByUserId(user.id)

      token.isOauth = !!account
      token.role = user.role
      token.name = user.name
      token.email = user.email
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
