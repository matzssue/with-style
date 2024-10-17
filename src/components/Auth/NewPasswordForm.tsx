'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import Alert from '../Alert/Alert'

import { PasswordSchema, passwordSchema } from '@/lib/schemas/auth-schema'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/lib/auth/new-password'
import { toast } from 'sonner'
import { FormFieldInput } from '../Inputs/FormFieldInput'

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: PasswordSchema) => {
    setError('')
    newPassword(values, token).then((data) => {
      setError(data?.error)
      setSuccess(data?.success)
      toast('Password successfully changed')
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <h1 className='text-center text-xl'>New password</h1>

        <FormFieldInput<PasswordSchema>
          control={form.control}
          label='Password'
          name='password'
          type='password'
          placeholder='********'
        />
        <Button className='w-full' type='submit'>
          Change password
        </Button>

        {error && <Alert type='error'>{error}</Alert>}
        {success && <Alert type='success'>{success}</Alert>}
        <Button asChild variant='link' className={cn('bg-none')}>
          <Link href={'/auth/login'}>Back to login</Link>
        </Button>
      </form>
    </Form>
  )
}
