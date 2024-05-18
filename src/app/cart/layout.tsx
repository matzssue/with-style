import type { Metadata } from 'next';
import { Inter, Advent_Pro } from 'next/font/google';
import '../globals.css';

import { NavBar } from '@/components/Navbar/NavBar';
import { Footer } from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header staticNavigation={<NavBar />} />

      <main>{children}</main>
      <Footer />
    </>
  );
}
