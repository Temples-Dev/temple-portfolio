import { create } from 'zustand'

interface UIState {
  isNavScrolled: boolean
  isMobileMenuOpen: boolean
  isContactModalOpen: boolean
  setNavScrolled: (scrolled: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  openContactModal: () => void
  closeContactModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isNavScrolled: false,
  isMobileMenuOpen: false,
  isContactModalOpen: false,
  setNavScrolled: (scrolled) => set({ isNavScrolled: scrolled }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  openContactModal: () => set({ isContactModalOpen: true, isMobileMenuOpen: false }),
  closeContactModal: () => set({ isContactModalOpen: false }),
}))
