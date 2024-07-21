import Credentials from 'next-auth/providers/credentials'
import { loginSchema } from './lib/schemas/auth-schema'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'

import Google from 'next-auth/providers/google'
import { getuserByEmail } from './data/user/user'
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFiellds = loginSchema.safeParse(credentials)
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
