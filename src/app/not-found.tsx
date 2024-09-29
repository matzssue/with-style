import { ButtonLink } from '@/components/Buttons/ButtonLink'

export default function NotFound() {
  return (
    <div className=' flex h-screen w-screen items-center justify-center bg-secondary'>
      <div className='flex h-1/2 w-1/2 flex-col items-center justify-center gap-2 rounded-md bg-neutral-100 px-7 py-5 shadow-md'>
        <h2 className='text-7xl font-bold'>Not Found</h2>
        <p className='py-2 text-2xl'>Could not find requested resource</p>
        <ButtonLink style={{ fontSize: '2rem' }} href='/'>
          Return Home
        </ButtonLink>
      </div>
    </div>
  )
}
