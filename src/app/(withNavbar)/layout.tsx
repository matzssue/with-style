import type { Metadata } from 'next'
import { Inter, Advent_Pro } from 'next/font/google'
import '../globals.css'

import { NavBar } from '@/components/Navbar/NavBar'
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
      <UserBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
