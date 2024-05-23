import Link from 'next/link'
import RegisterForm from '../../../components/Forms/RegisterForm'

export default async function RegisterPage() {
  return (
    <>
      <h1 className='py-5 text-center text-2xl font-bold'>Register account</h1>
      <RegisterForm />
      <p className='text-xl'>
        Arleady registered?
        <Link className='ml-3 font-bold' href='login'>
          Sign In
        </Link>
      </p>
    </>
  )
}
