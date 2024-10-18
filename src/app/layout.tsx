import './styles/globals.css'
import type { Metadata } from 'next'
import { Advent_Pro } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { auth } from '@/auth'

import { CustomSessionProvider } from '@/components/Provider/CustomSessionProvider'

const inter = Advent_Pro({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'With-style',
  description: 'e-commerce shop',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const sessionKey = new Date().valueOf()
  return (
    <CustomSessionProvider session={session} sessionKey={sessionKey}>
      <html lang='en'>
        <body
          className={cn(
            'flex min-h-screen  flex-col overflow-x-hidden bg-background font-sans text-primary antialiased',
            inter.variable
          )}
        >
          {children}
          <Toaster duration={3000} position='top-right' />
        </body>
      </html>
    </CustomSessionProvider>
  )
}
