import { type ILogEntry } from '@/types/logEntry'
import TbodyLogs from '@/components/logEntry/TbodyLogs'

interface ILogsTableProps {
  logs: ILogEntry[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function LogsTableComponent({ logs, isLoading, currentPage, totalPages, onPageChange }: ILogsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
            <th className="px-6 py-3">Owner</th>
            <th className="px-6 py-3">Log Text</th>
            <th className="px-6 py-3">Created At</th>
            <th className="px-6 py-3">Updated At</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <TbodyLogs isLoading={isLoading} logs={logs} />
      </table>
    </div>
  )
}
