'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import Alert from '../Alert/Alert'

import { LoginSchema, loginSchema } from '@/lib/schemas/auth-schema'

import { useState } from 'react'
import { GoogleButton } from './GoogleButton'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { login } from '@/actions/auth/login'
import { useSearchParams } from 'next/navigation'
import { FormFieldInput } from '../Inputs/FormFieldInput'

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)
  const params = useSearchParams()
  const urlError =
    params.get('error') === 'OAuthAccountNotLinked'
      ? 'Email arleady in use with different provider'
      : ''

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: LoginSchema) => {
    setLoading(true)
    setError('')
    login(values).then((data) => {
      setError(data?.error)
      setSuccess(data?.success)
    })
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormFieldInput<LoginSchema>
          control={form.control}
          label='Email'
          name='email'
          placeholder='example@example.com'
          type='email'
        />
        <FormFieldInput<LoginSchema>
          control={form.control}
          label='Password'
          name='password'
          placeholder='******'
          type='password'
        />

        <Button asChild variant='link' className={cn('bg-none px-0')}>
          <Link href={'/auth/reset'}>Forgot password?</Link>
        </Button>
        <Button className='w-full' type='submit'>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
        <GoogleButton />
        {error && <Alert type='error'>{error}</Alert>}
        {success && <Alert type='success'>{success}</Alert>}
        {urlError && <Alert type='error'>{urlError}</Alert>}
        <Button
          asChild
          className={cn(
            'bg-transparent py-0 text-primary hover:bg-transparent hover:underline'
          )}
        >
          <Link href={'/auth/register'}>New to our page? Register</Link>
        </Button>
      </form>
    </Form>
  )
}
