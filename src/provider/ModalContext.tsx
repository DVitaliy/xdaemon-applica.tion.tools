import { createContext, useContext } from 'react'

export const ModalContext = createContext<{ closeModal: VoidFunction }>({
  closeModal: () => {}
})

export const useModalContext = () => useContext(ModalContext)
