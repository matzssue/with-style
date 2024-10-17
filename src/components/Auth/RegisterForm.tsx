'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { RegisterSchema, registerSchema } from '@/lib/schemas/auth-schema'
import { useState } from 'react'

import Alert from '../Alert/Alert'
import { GoogleButton } from '../Auth/GoogleButton'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { register } from '@/actions/auth/register'
import { FormFieldInput } from '../Inputs/FormFieldInput'

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: RegisterSchema) => {
    setError('')
    setSuccess('')

    register(values).then((data) => {
      setError(data.error)
      setSuccess(data.success)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormFieldInput<RegisterSchema>
          control={form.control}
          label='Username'
          name='username'
        />
        <FormFieldInput<RegisterSchema>
          control={form.control}
          label='Email'
          name='email'
          type='email'
          placeholder='example@email.com'
        />
        <FormFieldInput<RegisterSchema>
          control={form.control}
          label='Password'
          name='password'
          type='password'
          placeholder='********'
        />
        <FormFieldInput<RegisterSchema>
          control={form.control}
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          placeholder='********'
        />

        <Button className='w-full' type='submit'>
          Submit
        </Button>
        <GoogleButton />
        {error && <Alert type='error'>{error}</Alert>}
        {success && <Alert type='success'>{success}</Alert>}
        <Button
          asChild
          className={cn(
            'bg-transparent py-0 text-primary hover:bg-transparent hover:underline'
          )}
        >
          <Link href={'/auth/login'}>Arleady registered? Login</Link>
        </Button>
      </form>
    </Form>
  )
}
