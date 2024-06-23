'use server'
import { getuserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { EmailSchema, emailSchema } from '@/lib/schemas/auth-schema'
import { generateResetPasswordToken } from '@/lib/tokens'

export const reset = async (values: EmailSchema) => {
  const validatedFields = emailSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }
  const { email } = validatedFields.data

  const existingUser = await getuserByEmail(email)
  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  const passwordResetToken = await generateResetPasswordToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: 'Email  email sent' }
}
