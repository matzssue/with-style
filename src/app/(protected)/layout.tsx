import Header from '@/components/Header/Header'
import { NavBar } from '@/components/Navbar/NavBar'
import UserBar from '@/components/UserBar/UserBar'
import Wrapper from '@/components/Wrapper/Wrapper'
import { SessionProvider } from 'next-auth/react'

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <Header staticNavigation={<NavBar />} />
      <UserBar />
      <Wrapper>{children}</Wrapper>
    </SessionProvider>
  )
}
