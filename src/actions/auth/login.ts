'use server'

import { LoginSchema, loginSchema } from '@/lib/schemas/auth-schema'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getuserByEmail } from '@/data/user/user'
import { generateVerificationToken } from '@/lib/auth/tokens'
import { sendVerificationEmail } from '@/lib/auth/mail'

export const login = async (values: LoginSchema) => {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getuserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' }
  }
  // EMAIL VERIFICATION

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return { success: 'Confirmation email sent' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid credentials',
          }
        case 'CallbackRouteError':
          return {
            error: 'Invalid credentials',
          }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}
