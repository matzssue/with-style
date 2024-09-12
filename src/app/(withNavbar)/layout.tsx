import { Footer } from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { StaticNavigation } from '@/components/Navbar/StaticNavigation'
import UserBar from '@/components/UserBar/UserBar'
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header staticNavigation={<StaticNavigation />} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
