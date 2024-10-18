'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, useMemo } from 'react'

type SessionProps = {
  sessionKey: number
  session: Session | null
  children: ReactNode
}

export const CustomSessionProvider = ({
  children,
  sessionKey,
  session,
}: SessionProps) => {
  const memoizedSessionKey = useMemo(() => {
    return sessionKey
  }, [session])

  return (
    <SessionProvider key={memoizedSessionKey} session={session}>
      {children}
    </SessionProvider>
  )
}
