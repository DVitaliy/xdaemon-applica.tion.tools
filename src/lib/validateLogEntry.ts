export function validateLogEntry({ Owner, LogText }: { Owner?: string | null; LogText?: string | null }) {
  const owner = Owner?.trim()
  const logText = LogText?.trim()

  if (!owner || !logText) {
    return { success: false, error: 'Owner and Log Text are required' }
  }

  if (owner.length < 3 || logText.length < 5) {
    return {
      success: false,
      error: 'Owner must be at least 3 characters and Log Text at least 5 characters'
    }
  }

  return { success: true, error: '' }
}
