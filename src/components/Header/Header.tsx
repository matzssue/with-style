'use client';
import { ReactNode, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../../../public/Logo.png';
import { useMediaQuery } from '@/hooks/use-media-query';
import { NavBar } from '../Navbar/NavBar';
import SideBar from '../Navbar/SideBar';
import { useSidebarContext } from '@/providers/SidebarContext';
import UserBar from '../UserBar/UserBar';
import Header1 from '../../../public/Header1.png';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '../ui/button';

export default function Header() {
  const isDesktop = useMediaQuery('(min-width:1024px');
  const { isOpen, toggleNavigation } = useSidebarContext();

  return (
    <>
      <header className='sticky top-0 z-50 w-full bg-white bg-opacity-90'>
        <div className='  top-0 flex  flex-row justify-between px-5'>
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

          <NavBar />
          <SideBar isOpen={isOpen} />
        </div>
      </header>
      <UserBar />
    </>
  );
}
