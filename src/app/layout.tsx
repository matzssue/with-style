import './styles/globals.css'
import type { Metadata } from 'next'
import { Advent_Pro } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

const inter = Advent_Pro({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body
          className={cn(
            'flex min-h-screen  flex-col overflow-x-hidden bg-background font-sans text-primary antialiased',
            inter.variable
          )}
        >
          {children}
          <Toaster position='top-right' />
        </body>
      </html>
    </SessionProvider>
  )
}
