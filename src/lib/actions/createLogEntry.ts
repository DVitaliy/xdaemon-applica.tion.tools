'use server'

import { logEntryDataSource } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createLogEntryAction(prevState: { success: boolean; error: string }, formData: FormData) {
  const Owner = formData.get('owner')?.toString().trim()
  const LogText = formData.get('logText')?.toString().trim()

  if (!Owner || !LogText) {
    return { success: false, error: 'Owner and Log Text are required' }
  }

  await logEntryDataSource.create({ Owner, LogText })
  revalidatePath('/')
  return { success: true, error: '' }
}
