import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type TModalProps = {
  isShowing: boolean
  closeModal: VoidFunction
  children: React.ReactNode
}

export default function Modal({ isShowing, children, closeModal }: TModalProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isShowing) {
      requestAnimationFrame(() => setShow(true))
    } else {
      setShow(false)
    }
  }, [isShowing])

  if (!isShowing) return null

  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-20 bg-black/70">
      <button onClick={closeModal} className="absolute z-30 top-4 right-4 rounded-full w-10 h-10 text-white border border-white bg-slate-800 hover:opacity-50">
        ✕
      </button>
      <div
        className={`
          bg-white overflow-auto max-h-[95vh] max-w-[100vw] md:max-h-[90vh] md:max-w-[80vw]
          rounded-lg p-6 transition-all duration-300 ease-out
          transform
          ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
        `}>
        {children}
      </div>
    </div>,
    document.body
  )
}
