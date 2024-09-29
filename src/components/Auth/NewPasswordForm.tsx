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
import { PasswordSchema, passwordSchema } from '@/lib/schemas/auth-schema'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/lib/auth/new-password'
import { toast } from 'sonner'

export default function NewPasswordForm() {
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
