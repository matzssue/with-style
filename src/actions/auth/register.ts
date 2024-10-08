'use server'

import { RegisterSchema, registerSchema } from '@/lib/schemas/auth-schema'
import bcrypr from 'bcryptjs'
import prisma from '@/lib/prisma'
import { generateVerificationToken } from '@/lib/auth/tokens'
import { sendVerificationEmail } from '@/lib/auth/mail'

export const register = async (values: RegisterSchema) => {
  const validatedFields = registerSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, username } = validatedFields.data
  const hashedPassword = await bcrypr.hash(password, 10)

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: 'Email arleady in use' }
  }

  await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  })
  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: 'Account registered, confirmation email sent' }
}
