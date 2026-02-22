import { create } from 'zustand'

type ModalState = {
  openModal: string | null
  open: (id: string) => void
  close: () => void
  isOpen: (id: string) => boolean
}

export const useModalStore = create<ModalState>((set, get) => ({
  openModal: null,

  open: (id) => set({ openModal: id }),

  close: () => set({ openModal: null }),

  isOpen: (id) => get().openModal === id,
}))
