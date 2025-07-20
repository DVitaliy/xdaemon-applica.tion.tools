import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createLogEntryAction } from '../createLogEntry'
import * as validationModule from '@/lib/validateLogEntry'

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}))

vi.stubGlobal('fetch', vi.fn())

const createFormData = (data: Record<string, string>) => {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  return formData
}

describe('createLogEntryAction', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.stubEnv('BASE_URL', 'http://localhost:3000')
  })

  it('should return error if validation fails', async () => {
    vi.spyOn(validationModule, 'validateLogEntry').mockReturnValueOnce({
      success: false,
      error: 'Invalid input'
    })

    const formData = createFormData({ Owner: '', LogText: '' })
    const result = await createLogEntryAction({ success: false, error: '' }, formData)

    expect(result).toEqual({ success: false, error: 'Invalid input' })
    expect(fetch).not.toHaveBeenCalled()
  })
})
