import Image from 'next/image'
import Logo from '../../../public/Logo.png'
import { TshirtIcon } from '../../../public/icons/TshirtIcon'
import { FaInstagram } from 'react-icons/fa6'
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import Link from 'next/link'

const Icons = [
  <FaFacebook size='1.5em' />,
  <FaLinkedin size='1.5em' />,
  <FaTwitter size='1.5em' />,
  <FaYoutube size='1.5em' />,
  <FaInstagram size='1.5em' />,
]

export const Footer = () => {
  return (
    <footer className='mt-5 flex w-full flex-wrap justify-around gap-5 bg-secondary p-4 '>
      <div>
        <Image alt='logo' src={Logo} height={90} />
      </div>
      <div className='max-md:flex max-md:w-full max-md:flex-col max-md:items-center'>
        <p className='mb-5 text-lg font-bold'>Contact us</p>
        <ul className='flex gap-4'>
          {Icons.map((icon, i) => (
            <li key={i}>
              <Link href={'#'}>{icon}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className='mb-5 text-lg font-bold'>Privacy & Security</p>
        <ul>
          <li>
            <Link href={'#'}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={'#'}>Copyright</Link>
          </li>
          <li>
            <Link href={'#'}>Social Media Policy</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className='mb-5 text-lg font-bold'>Links</p>
        <ul>
          <li>
            <Link href={'#'}>Blog</Link>
          </li>
          <li>
            <Link href={'#'}>Carrers</Link>
          </li>
          <li>
            <Link href={'#'}>Reviews</Link>
          </li>
        </ul>
      </div>
      <div className='flex w-full justify-center text-center'>
        <p className='text-lg'>@ 2024 Created by: Mateusz K</p>
      </div>
    </footer>
  )
}
