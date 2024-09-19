import { TopProducts } from '@/app/(components)/Home/TopProducts'
import { Categories } from '@/app/(components)/Home/Categories'
import { Footer } from '@/components/Footer/Footer'
import { Benefits } from '@/app/(components)/Home/Benefits'
import { NewProducts } from '@/app/(components)/Home/NewProducts'
import Header from '@/components/Header/Header'
import { Hero } from '@/app/(components)/Hero/Hero'
import { StaticNavigation } from '@/components/Navbar/StaticNavigation'
import UserBar from '@/components/UserBar/UserBar'

export default function Home() {
  return (
    <>
      <Header staticNavigation={<StaticNavigation />} />
      <main className='flex w-full flex-col items-center justify-between overflow-x-hidden'>
        <Hero />
        <TopProducts />
        <NewProducts />
        <Categories />
        <Benefits />
      </main>
      <Footer />
    </>
  )
}
