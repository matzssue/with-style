import Header from '@/components/Header/Header'
import { NavBar } from '@/components/Navbar/NavBar'
import Wrapper from '@/components/Wrapper/Wrapper'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header staticNavigation={<NavBar />} />
      <Wrapper>{children}</Wrapper>
    </>
  )
}
