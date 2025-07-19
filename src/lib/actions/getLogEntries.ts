import { logEntryDataSource } from '@/lib/db'
import { cache } from 'react'

export const getLogEntriesAction = cache(async () => {
  return logEntryDataSource.getAll()
})
