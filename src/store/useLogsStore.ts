// src/store/useLogsStore.ts
import { create } from 'zustand'
import { type ILogEntry } from '@/types/logEntry'

type LogsState = {
  page: number
  logs: ILogEntry[]
  isLoading: boolean
  error: boolean
  fetchLogs: () => Promise<void>
  setPage: (value: number) => void
}

export const useLogsStore = create<LogsState>((set) => ({
  logs: [],
  page: 1,
  isLoading: false,
  error: false,

  fetchLogs: async () => {
    set({ isLoading: true })
    try {
      await new Promise((r) => setTimeout(r, 1000)) // simulate delay
      const response = await fetch('/api/logs')
      if (!response.ok) throw new Error('Failed to fetch logs')
      const result = await response.json()
      set({ logs: result, isLoading: false })
    } catch (err) {
      console.error(err)
      set({ error: true, isLoading: false })
    }
  },

  setPage: (value) => set({ page: value })
}))
