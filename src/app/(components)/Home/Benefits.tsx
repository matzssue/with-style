import { benefitsData } from '@/constants/benefits'

export const Benefits = () => {
  return (
    <section className='w-full px-4'>
      <hr className='my-12 h-16 w-full bg-secondary'></hr>
      <div className='my-12 w-full'>
        <ul className='flec-row flex justify-around gap-10 max-md:flex-col'>
          {benefitsData.map(({ icon, text }) => (
            <li className='flex flex-col items-center justify-center gap-y-5'>
              {icon}
              <p className='max-w-xl text-xl max-lg:text-lg'>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
