import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema, loginSchema } from './lib/schemas/auth-schema'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import prisma from './lib/prisma'
import Google from 'next-auth/providers/google'
import { getuserByEmail } from './data/user'
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize() {
        const validatedFiellds = loginSchema.safeParse(this.credentials)
        if (validatedFiellds.success) {
          const { email, password } = validatedFiellds.data
          const user = await getuserByEmail(email)
          if (!user || !user.password) return null
          const passwordMatch = await bcrypt.compare(password, user.password)
          if (passwordMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
