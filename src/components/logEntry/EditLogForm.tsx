'use client'
import SubmitButton from '@/components/ui/SubmitButton'
import Button from '@/components/ui/Button'
import { updateLogEntryAction } from '@/lib/actions/updateLogEntry'
import { useActionState, useEffect } from 'react'
import { useToastContext } from '@/provider/ToastProvider'
import { useLogsStore } from '@/store/useLogsStore'

export default function EditLogFormComponent({ id, closeModal }: { id: string; closeModal: VoidFunction }) {
  const [state, submit] = useActionState(updateLogEntryAction, { success: false, error: '' })
  const { fetchLogs, logs } = useLogsStore()
  const { toast } = useToastContext()

  useEffect(() => {
    async function refreshLogs() {
      await fetchLogs()
    }
    if (state.success) {
      closeModal()
      refreshLogs()
      toast('success', 'Log entry updated successfully')
    }
  }, [state.success])

  const log = logs.find((log) => log.id === id)
  if (!log) return null

  const { Owner, LogText } = log
  return (
    <div className="w-full sm:w-[600px]">
      <form action={submit}>
        <input type="hidden" name="id" value={id} />
        <div className="flex flex-col gap-y-5">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold leading-none tracking-tight">Update Log Entry</h2>
            <p className="text-sm text-gray-500">Fill in the details below to update the log entry.</p>
          </div>
          {state.error && <div className="text-red-500 text-sm">{state.error}</div>}
          <div className="space-y-2">
            <label htmlFor="Owner" className="block text-sm font-medium text-gray-700">
              Owner
            </label>
            <input
              type="text"
              id="Owner"
              name="Owner"
              defaultValue={Owner}
              placeholder="Enter owner name"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="LogText" className="block text-sm">
              Log Text
            </label>
            <textarea
              id="LogText"
              name="LogText"
              rows={4}
              defaultValue={LogText}
              placeholder="Enter log message..."
              className="min-h-[80px] w-full rounded-md border border-gray-200 px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
              required
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
            <Button type="button" theme="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <SubmitButton theme="primary" type="submit">
              ✏️ Edit Log
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  )
}
