'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

type ToastStatus = 'success' | 'failed'

type Toast = {
  id: number
  message: string
  status: ToastStatus
  duration: number
}

type ToastContextType = {
  toast: (status: ToastStatus, message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((status: ToastStatus, message: string, duration = 3000) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, status, message, duration }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className={`px-4 py-2 rounded shadow text-white transition-all duration-300 ${toast.status === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }
  return context
}
