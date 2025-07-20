'use server'

import { revalidatePath } from 'next/cache'
import { validateLogEntry } from '@/lib/validateLogEntry'

export async function updateLogEntryAction(prevState: { success: boolean; error: string }, formData: FormData) {
  const id = formData.get('id')?.toString().trim()
  if (!id) {
    return { success: false, error: 'Log entry ID is required' }
  }

  const Owner = formData.get('Owner')?.toString().trim()
  const LogText = formData.get('LogText')?.toString().trim()

  const validation = validateLogEntry({ Owner, LogText })
  if (!validation.success) return validation

  await fetch(`${process.env.BASE_URL}/api/logs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ Owner, LogText })
  })
  revalidatePath('/')
  return { success: true, error: '' }
}
