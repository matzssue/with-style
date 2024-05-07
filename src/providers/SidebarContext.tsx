'use client';

import { getSafeContext } from '@/utils/getSafeContext';
import { ReactNode, createContext, useContext, useState } from 'react';

type SidebarContextProps = {
  toggleNavigation: () => void;
  isOpen: boolean;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

export const SidebarContectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleNavigation = () => {
    setIsOpen((prevValue) => !prevValue);
  };
  const valueContext = {
    isOpen,

    toggleNavigation,
  };

  return (
    <SidebarContext.Provider value={valueContext}>
      {children}
    </SidebarContext.Provider>
  );
};
export const useSidebarContext = getSafeContext(
  SidebarContext,
  'Sidebar Context'
);
