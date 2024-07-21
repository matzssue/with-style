'use client'

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className=' flex w-full flex-col items-center justify-center'>
      <p className='text-2xl font-bold'>Error</p>
      <div>{error.message} </div>
    </div>
  )
}
