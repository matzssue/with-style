import { RegisterForm } from '@/components/Auth/RegisterForm'

export default async function RegisterPage() {
  return (
    <>
      <h1 className='py-5 text-center text-2xl font-bold'>Register account</h1>
      <RegisterForm />
    </>
  )
}
