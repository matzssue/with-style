'use client'

import { newVerification } from '@/actions/new-verification'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Alert from '../Alert/Alert'
import { Loading } from '../Loading/Loading'

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return
    if (!token) {
      setError('No token')
      return
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div>
      <p>Verification</p>
      {!success && !error && <Loading />}
      {error && <Alert type='error'>{error}</Alert>}
      {error && <Alert type='success'>{success}</Alert>}
    </div>
  )
}
