'use client'

import { useCurrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'
import Alert from '../Alert/Alert'

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: UserRole[]
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole()

  if (role && !allowedRole.includes(role)) {
    return <Alert type='error'>You&apos;r not allowed to view this page</Alert>
  }
  return <>{children}</>
}
