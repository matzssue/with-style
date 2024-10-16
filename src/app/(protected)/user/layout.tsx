import { RoleWrapper } from '@/components/Auth/RoleWrapper'
import Header from '@/components/Header/Header'
import { StaticNavigation } from '@/components/Navbar/StaticNavigation'
import UserBar from '@/components/UserBar/UserBar'
import Wrapper from '@/components/Wrapper/Wrapper'

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RoleWrapper allowedRole={['USER', 'ADMIN']}>
      <Header staticNavigation={<StaticNavigation />} />
      <UserBar />
      <Wrapper>{children}</Wrapper>
    </RoleWrapper>
  )
}
