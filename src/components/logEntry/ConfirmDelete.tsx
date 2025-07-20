'use client'
import SubmitButton from '@/components/ui/SubmitButton'
import Button from '@/components/ui/Button'
import { useActionState, useEffect } from 'react'
import { useToastContext } from '@/provider/ToastProvider'
import { deleteLogEntryAction } from '@/lib/actions/deleteLogEntry'
import { useLogsStore } from '@/store/useLogsStore'

export default function ConfirmDeleteComponent({ id, closeModal }: { id: string; closeModal: VoidFunction }) {
  const [state, submit] = useActionState(deleteLogEntryAction, { success: false, error: '' })
  const { toast } = useToastContext()
  const { fetchLogs } = useLogsStore()

  useEffect(() => {
    async function refreshLogs() {
      await fetchLogs()
    }
    if (state.success) {
      closeModal()
      refreshLogs()
      toast('success', 'Log entry deleted successfully')
    }
  }, [state.success])

  return (
    <div className="w-full sm:w-[600px]">
      <form action={submit}>
        <input type="hidden" name="id" value={id} />
        <div className="flex flex-col gap-y-5">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold leading-none tracking-tight">Confirm Delete</h2>
            <p className="text-sm text-gray-500">Are you sure you want to delete this log entry?</p>
          </div>
          {state.error && <div className="text-red-500 text-sm">{state.error}</div>}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
            <Button type="button" theme="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <SubmitButton theme="danger" type="submit">
              Confirm Delete
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  )
}
