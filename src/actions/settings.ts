'use server'

import prisma from '@/lib/prisma'
import { getuserByEmail, getuserById } from '@/data/user'
import { SettingsSchema } from '@/lib/schemas/auth-schema'
import bcrypt from 'bcryptjs'
import { currentUser } from '@/lib/auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { error } from 'console'

export const settings = async (values: SettingsSchema) => {
  const user = await currentUser()

  if (!user?.id) {
    return { error: 'Unauthorized' }
  }

  const prismaUser = await getuserById(user.id)

  if (!prismaUser) {
    return { error: 'Unauthorized' }
  }

  if (user.isOuath) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getuserByEmail(values.email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email arleady in use' }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return { success: 'Verification email sent!' }
  }

  if (values.password && values.newPassword && prismaUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      prismaUser.password
    )
    if (!passwordsMatch) {
      return { error: 'Incorrect password!' }
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }

  await prisma.user.update({
    where: { id: prismaUser.id },
    data: { ...values },
  })

  return { succes: 'Settings updated' }
}
