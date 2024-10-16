'use client'

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1 className='py-5 text-center text-3xl'>You&apos;r orders</h1>
      <div className=' flex w-full flex-col items-center justify-center'>
        <p className='text-2xl font-bold'>Error</p>
        <div>{error.message} </div>
      </div>
    </div>
  )
}
