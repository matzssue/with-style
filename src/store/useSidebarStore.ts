import { create } from 'zustand'

type Sidebar = {
  toggleNavigation: () => void
  isOpen: boolean
}

const INITIAL_STATE = {
  isOpen: false,
}

export const useSidebarStore = create<Sidebar>((set, get) => ({
  isOpen: INITIAL_STATE.isOpen,

  toggleNavigation: () => {
    set((state) => ({
      isOpen: !state.isOpen,
    }))
  },
}))
