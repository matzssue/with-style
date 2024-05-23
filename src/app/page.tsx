import { TopProducts } from '@/components/Home/TopProducts'
import { Categories } from '@/components/Home/Categories'
import { Footer } from '@/components/Footer/Footer'
import { Benefits } from '@/components/Home/Benefits'
import { NewProducts } from '@/components/Home/NewProducts'
import Header from '@/components/Header/Header'
import { Hero } from '@/components/Hero/Hero'
import Wrapper from '@/components/Wrapper/Wrapper'
import { NavBar } from '@/components/Navbar/NavBar'
import { StaticNavigation } from '@/components/Navbar/StaticNavigation'
import UserBar from '@/components/UserBar/UserBar'

export default function Home() {
  return (
    <>
      <Header staticNavigation={<StaticNavigation />} />

      <UserBar />
      <main className='flex w-full flex-col items-center justify-between'>
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
