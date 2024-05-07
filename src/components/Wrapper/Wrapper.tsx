'use client';
import { useSidebarContext } from '@/providers/SidebarContext';
import { ReactNode } from 'react';

export default function Wrapper({ children }: { children: ReactNode }) {
  const { isOpen, toggleNavigation } = useSidebarContext();

  return (
    <div
      className={` p-6 transition-all duration-200 ease-in-out ${isOpen ? 'translate-x-64' : '-translate-x-0'}`}
    >
      {children}
    </div>
  );
}
