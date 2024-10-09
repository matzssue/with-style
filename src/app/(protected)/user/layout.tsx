import { auth } from '@/auth'
import { RoleWrapper } from '@/components/Auth/RoleWrapper'
import Header from '@/components/Header/Header'
import { StaticNavigation } from '@/components/Navbar/StaticNavigation'
import UserBar from '@/components/UserBar/UserBar'
import Wrapper from '@/components/Wrapper/Wrapper'
import { SessionProvider } from 'next-auth/react'

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <RoleWrapper allowedRole={['USER', 'ADMIN']}>
        <Header staticNavigation={<StaticNavigation />} />
        <UserBar />
        <Wrapper>{children}</Wrapper>
      </RoleWrapper>
    </SessionProvider>
  )
}
