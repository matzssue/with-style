import { Suspense } from 'react'

import { Loading } from '@/components/Loading/Loading'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='flex flex-row max-lg:flex-col'>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  )
}
