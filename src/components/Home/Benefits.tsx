import { TbTruckDelivery } from 'react-icons/tb'
import { RiRefund2Line } from 'react-icons/ri'
import { Ri24HoursFill } from 'react-icons/ri'
export const Benefits = () => {
  return (
    <section className='w-full'>
      <hr className='my-12 h-16 w-full bg-secondary'></hr>
      <div className='my-12 w-full'>
        <ul className='flec-row flex justify-around gap-10 '>
          <li className='flex flex-col items-center justify-center'>
            <TbTruckDelivery size={100} />
            <p className='max-w-xl text-xl'>
              Enjoy flexible and free deliveries with us! Shop hassle-free and
              get your items delivered quickly, tailored to your needs.
            </p>
          </li>
          <li className='flex flex-col items-center justify-center'>
            <RiRefund2Line size={100} />
            <p className='max-w-xl text-xl'>
              Take advantage of our 30-day free return option! Shop confidently,
              knowing you can return your items at no additional cost{' '}
            </p>
          </li>
          <li className='flex flex-col items-center justify-center'>
            <Ri24HoursFill size={100} />
            <p className='max-w-xl text-xl'>
              Get your orders shipped within 24 hours of purchase! Enjoy swift
              delivery and receive your items in no time.
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}
