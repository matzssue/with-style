import { TbTruckDelivery } from 'react-icons/tb'
import { RiRefund2Line } from 'react-icons/ri'
import { Ri24HoursFill } from 'react-icons/ri'

export const benefitsData = [
  {
    icon: (
      <TbTruckDelivery className=' size-24 max-lg:size-20 max-md:size-16 ' />
    ),
    text: 'Enjoy flexible and free deliveries with us! Shop hassle-free and get your items delivered quickly, tailored to your needs.',
  },
  {
    icon: <RiRefund2Line className=' size-24 max-lg:size-20 max-md:size-16 ' />,
    text: 'Take advantage of our 30-day free return option! Shop confidently, knowing you can return your items at no additional cost.',
  },
  {
    icon: <Ri24HoursFill className=' size-24 max-lg:size-20 max-md:size-16 ' />,
    text: 'Get your orders shipped within 24 hours of purchase! Enjoy swift delivery and receive your items in no time.',
  },
]
