import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createLogEntryAction } from '@/lib/actions/createLogEntry'

vi.mock('@/lib/db', () => ({
  logEntryDataSource: {
    create: vi.fn()
  }
}))
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}))

import { logEntryDataSource } from '@/lib/db'
import { revalidatePath } from 'next/cache'

describe('createLogEntryAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('return error if Owner or LogText is missing', async () => {
    const formData = new FormData()
    formData.set('Owner', '')
    formData.set('LogText', '')

    const result = await createLogEntryAction({ success: false, error: '' }, formData)

    expect(result.error).toBe('Owner and LogText are required')
    expect(logEntryDataSource.create).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('creates a log entry and triggers revalidatePath', async () => {
    const formData = new FormData()
    formData.set('Owner', 'John Doe')
    formData.set('LogText', 'This is a log entry')

    const result = await createLogEntryAction({ success: true, error: '' }, formData)

    expect(logEntryDataSource.create).toHaveBeenCalledWith({
      Owner: 'John Doe',
      LogText: 'This is a log entry'
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(result).toEqual({ success: true, error: '' })
  })
})
