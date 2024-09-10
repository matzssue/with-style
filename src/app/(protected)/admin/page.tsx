import { currentRole } from '@/lib/auth/auth'

import { Statistics } from './(components)/Statistics'

export default async function AdminDashboard() {
  const role = await currentRole()

  return <Statistics />
}
