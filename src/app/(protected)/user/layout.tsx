import { auth } from '@/auth'
import Header from '@/components/Header/Header'
import { NavBar } from '@/components/Navbar/NavBar'
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
      <Header staticNavigation={<StaticNavigation />} />
      <UserBar />
      <Wrapper>{children}</Wrapper>
    </SessionProvider>
  )
}
