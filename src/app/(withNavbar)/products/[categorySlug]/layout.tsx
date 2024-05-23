export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <section className='flex flex-row'>{children}</section>
}
