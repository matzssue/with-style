import Image from 'next/image';
import Logo from '../../../public/Logo.png';
import { NavBar } from '../Navbar/NavBar';
import SideBar from '../Navbar/SideBar';
import { useSidebarContext } from '@/providers/SidebarContext';
import UserBar from '../UserBar/UserBar';

export default function Header({
  staticNavigation,
}: {
  staticNavigation: React.ReactNode;
}) {
  const { isOpen, toggleNavigation } = useSidebarContext();

  return (
    <>
      <header className='sticky top-0 z-50 w-full bg-white'>
        <div className='top-0 flex  flex-row justify-between px-5'>
          <Image
            className=''
            src={Logo}
            style={{ minHeight: '80px', zIndex: '100' }}
            height={200}
            width={300}
            alt='logo'
          />

          <button className='lg:hidden' onClick={() => toggleNavigation()}>
            XXXXXXX
          </button>

          {staticNavigation}
          <SideBar isOpen={isOpen} />
        </div>
      </header>
      <UserBar />
    </>
  );
}
