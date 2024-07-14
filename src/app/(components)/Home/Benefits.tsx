import { TbTruckDelivery } from 'react-icons/tb'
import { RiRefund2Line } from 'react-icons/ri'
import { Ri24HoursFill } from 'react-icons/ri'
export const Benefits = () => {
  return (
    <section className='w-full px-4'>
      <hr className='my-12 h-16 w-full bg-secondary'></hr>
      <div className='my-12 w-full'>
        <ul className='flec-row flex justify-around gap-10 max-md:flex-col'>
          <li className='flex flex-col items-center justify-center gap-y-5'>
            <TbTruckDelivery className=' size-24 max-lg:size-20 max-md:size-16 ' />
            <p className='max-w-xl text-xl max-lg:text-lg'>
              Enjoy flexible and free deliveries with us! Shop hassle-free and
              get your items delivered quickly, tailored to your needs.
            </p>
          </li>
          <li className='flex flex-col items-center justify-center gap-y-5'>
            <RiRefund2Line className=' size-24 max-lg:size-20 max-md:size-16 ' />
            <p className='max-w-xl text-xl max-lg:text-lg'>
              Take advantage of our 30-day free return option! Shop confidently,
              knowing you can return your items at no additional cost{' '}
            </p>
          </li>
          <li className='flex flex-col items-center justify-center gap-y-5'>
            <Ri24HoursFill className=' size-24 max-lg:size-20 max-md:size-16 ' />
            <p className='max-w-xl text-xl max-lg:text-lg'>
              Get your orders shipped within 24 hours of purchase! Enjoy swift
              delivery and receive your items in no time.
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}
