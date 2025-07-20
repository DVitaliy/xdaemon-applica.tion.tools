'use client'
import LogsTable from '@/components/logEntry/LogsTable'
import { useEffect, useMemo, useState } from 'react'
import Modal from '@/components/layout/Modal'
import AddLogForm from '@/components/logEntry/AddLogForm'
import Button from '@/components/ui/Button'
import { useLogsStore } from '@/store/useLogsStore'
import { useToastContext } from '@/provider/ToastProvider'
import Pagination from '@/components/layout/Pagination'
export const dynamic = 'force-dynamic'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { logs, isLoading, error, fetchLogs, limit, page, setPage } = useLogsStore()
  const { toast } = useToastContext()

  const [isAddNewLog, setIsAddNewLog] = useState(false)

  const sortedFilteredLogs = useMemo(() => {
    const sorted = logs.toSorted((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())

    const filtered =
      searchTerm === ''
        ? sorted
        : sorted.filter(({ Owner, LogText }) => Owner.toLowerCase().includes(searchTerm.toLowerCase()) || LogText.toLowerCase().includes(searchTerm.toLowerCase()))

    const start = (page - 1) * limit
    const end = start + limit

    return filtered.slice(start, end)
  }, [logs, limit, page, searchTerm])

  useEffect(() => {
    fetchLogs()
  }, [])

  useEffect(() => {
    if (error) toast('failed', 'Failed to load logs. Please try again.')
  }, [error])

  return (
    <div className="container mx-auto mb-2 sm:mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="font-bold text-2xl sm:text-3xl">System Logs</h2>
          <p className="text-sm text-gray-500">Manage and monitor system log entries with full CRUD operations.</p>
        </div>

        <div className="mt-4 sm:mt-0 mx-auto sm:mx-0">
          <Button onClick={() => setIsAddNewLog(true)} theme="primary">
            + Add New Log
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="px-2 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Total logs: <span>{logs.length || 0}</span>
              </span>

              {isLoading && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600" />
                  <span>Loading...</span>
                </div>
              )}
            </div>

            <div className="mt-3 sm:mt-0 flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">🔎</div>
                <input
                  type="text"
                  placeholder="Search logs..."
                  className="bg-white flex h-10 rounded-md border border-gray-300 px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm pl-10 w-64"
                  onChange={(e) => {
                    setPage(1) // Reset to first page on search
                    setSearchTerm(e.target.value)
                  }}
                  value={searchTerm}
                />
              </div>
            </div>
          </div>
        </div>

        <LogsTable logs={sortedFilteredLogs} isLoading={isLoading} />
        <Pagination />
      </div>

      <Modal isShowing={isAddNewLog} closeModal={() => setIsAddNewLog(false)}>
        <AddLogForm />
      </Modal>
    </div>
  )
}
