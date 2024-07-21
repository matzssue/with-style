'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Alert from '../Alert/Alert'
import { Input } from '@/components/ui/input'
import { LoginSchema, loginSchema } from '@/lib/schemas/auth-schema'

import { useState } from 'react'
import { GoogleButton } from './GoogleButton'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { login } from '@/actions/auth/login'

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: LoginSchema) => {
    setError('')
    login(values).then((data) => {
      setError(data?.error)
      setSuccess(data?.success)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='example@example.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button asChild variant='link' className={cn('bg-none px-0')}>
          <Link href={'/auth/reset'}>Forgot password?</Link>
        </Button>
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
          <Link href={'/auth/register'}>New to our page? Register</Link>
        </Button>
      </form>
    </Form>
  )
}
