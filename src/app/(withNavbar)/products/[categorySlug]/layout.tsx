import { Suspense } from 'react'
import { ProductsMenu } from '../../(components)/ProductsMenu'
import { Loading } from '@/components/Loading/Loading'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='flex flex-row max-lg:flex-col'>
      <ProductsMenu />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  )
}
