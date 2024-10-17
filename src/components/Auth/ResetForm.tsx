'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import Alert from '../Alert/Alert'

import { EmailSchema, emailSchema } from '@/lib/schemas/auth-schema'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { reset } from '@/lib/auth/reset'
import { FormFieldInput } from '../Inputs/FormFieldInput'

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: EmailSchema) => {
    setError('')
    reset(values).then((data) => {
      setError(data?.error)
      setSuccess(data?.success)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <h1 className='text-center text-xl'>Forgot your password?</h1>
        <FormFieldInput<EmailSchema>
          control={form.control}
          label='Email'
          name='email'
          placeholder='example@example.com'
          type='email'
        />

        <Button className='w-full' type='submit'>
          Send reset email
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
