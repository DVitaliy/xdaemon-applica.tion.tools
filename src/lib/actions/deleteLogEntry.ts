'use server'

import { revalidatePath } from 'next/cache'

export async function deleteLogEntryAction(prevState: { success: boolean; error: string }, formData: FormData) {
  const id = formData.get('id')?.toString().trim()

  if (!id) {
    return { success: false, error: 'Log entry ID is required' }
  }

  await fetch(`${process.env.BASE_URL}/api/logs/${id}`, {
    method: 'DELETE'
  })
  revalidatePath('/')
  return { success: true, error: '' }
}
