'use client'

import Alert from '@/components/Alert/Alert'
import { FormFieldInput } from '@/components/Inputs/FormFieldInput'
import { Loading } from '@/components/Loading/Loading'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { settings } from '@/lib/auth/settings'
import { SettingsSchema, settingsSchema } from '@/lib/schemas/auth-schema'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut, useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export default function SettingsPage() {
  const { data, status } = useSession()
  const user = data?.user
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  if (status === 'loading')
    return (
      <div>
        <Loading />
      </div>
    )
  const form = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
    },
  })

  const onSubmit = (values: SettingsSchema) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }
          if (data.succes) {
            setSuccess(data.succes)
            setError(undefined)
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }

  return (
    <div className='flex  flex-col items-center px-2  py-5 max-md:py-8 '>
      <div className='flex h-[800px] w-full max-w-[800px] flex-col  justify-around gap-2 rounded-sm  bg-neutral-100 px-4 py-6 shadow-md'>
        <p className='rounded-sm bg-secondary px-4 py-4 text-center text-2xl font-semibold shadow-sm'>
          Settings
        </p>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormFieldInput<SettingsSchema>
                control={form.control}
                name='name'
                label='Name'
                placeholder={user?.name || ''}
                props={{ disabled: isPending }}
              />

              {user?.isOauth === false && (
                <>
                  <FormFieldInput<SettingsSchema>
                    control={form.control}
                    name='email'
                    label='Email'
                    type='email'
                    placeholder={user?.email || ''}
                    props={{ disabled: isPending || user.role === 'TEST' }}
                  />
                  <FormFieldInput<SettingsSchema>
                    control={form.control}
                    name='password'
                    label='Password'
                    type='password'
                    placeholder='******'
                    props={{ disabled: isPending || user.role === 'TEST' }}
                  />
                  <FormFieldInput<SettingsSchema>
                    control={form.control}
                    name='newPassword'
                    label='New Password'
                    type='password'
                    placeholder='******'
                    props={{ disabled: isPending || user.role === 'TEST' }}
                  />
                </>
              )}
            </div>
            {success && <Alert type='success'>{success}</Alert>}
            {error && <Alert type='error'>{error}</Alert>}
            {user?.role === 'TEST' && (
              <p>Some options might be disabled for test account</p>
            )}
            <Button className={cn('px-10 py-2')} disabled={isPending}>
              Update
            </Button>
          </form>
        </Form>
        <Button
          onClick={() => signOut()}
          className={cn('mx-auto w-1/2 cursor-pointer')}
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}
