'use client'
import { useSidebarStore } from '@/store/useSidebarStore'

import { ReactNode } from 'react'

export default function Wrapper({ children }: { children: ReactNode }) {
  const isOpen = useSidebarStore((state) => state.isOpen)

  return (
    <div
      className={` py-6 transition-all duration-200 ease-in-out ${isOpen ? 'translate-x-64' : '-translate-x-0'}`}
    >
      {children}
    </div>
  )
}
