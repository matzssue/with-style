import { Footer } from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { StaticNavigation } from '@/components/Navbar/StaticNavigation'

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
