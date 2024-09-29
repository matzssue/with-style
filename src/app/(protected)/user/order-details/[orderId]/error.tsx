'use client'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <h2 className='py-5 text-center text-3xl'>{error.message}</h2>
    </main>
  )
}
