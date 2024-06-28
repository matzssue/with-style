import { newPassword } from '@/actions/new-password'
import { z } from 'zod'

export type RegisterSchema = z.infer<typeof registerSchema>
export type LoginSchema = z.infer<typeof loginSchema>
export type EmailSchema = z.infer<typeof emailSchema>
export type PasswordSchema = z.infer<typeof passwordSchema>
export type SettingsSchema = z.infer<typeof settingsSchema>
export type AddressSchema = z.infer<typeof addressSchema>

export const registerSchema = z
  .object({
    username: z.string().min(4, {
      message: 'Username must be at least 4 characters.',
    }),
    email: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .email('This is not a valid email.'),
    password: z
      .string()
      .min(6, { message: 'Minimum of 6 characters required' }),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      })
    }
  })

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().min(6, {
    message: 'Minimum of 6 characters required',
  }),
})
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
})
export const passwordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum of 6 characters required',
  }),
})

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const addressSchema = z.object({
  name: z.string().min(3).max(15),
  surname: z.string().min(3).max(15),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
  street: z.string().min(3).max(50),
  number: z.string(),
  city: z.string().min(3).max(50),
  zip: z.string().min(3).max(6),
})

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }
      if (data.newPassword && !data.password) {
        return false
      }
      return true
    },
    {
      message: 'New password is required!',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: 'Password is required!',
      path: ['password'],
    }
  )
