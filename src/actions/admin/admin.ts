'user server'

import { currentRole } from '@/lib/auth/auth'

export const admin = async () => {
  const role = await currentRole()
  if (role === 'ADMIN') {
    return { succes: 'Allowed' }
  }
  return { error: 'Not allowed!' }
}
