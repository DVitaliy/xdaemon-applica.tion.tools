import { ILogEntry } from '@/types/logEntry'
import TbodySkeleton from '@/components/logEntry/TbodySkeleton'
import TbodyEmpty from '@/components/logEntry/TbodyEmpty'
import Modal from '@/components/layout/Modal'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import ConfirmDelete from './ConfirmDelete'
import EditLogForm from './EditLogForm'

export default function TbodyLogsComponent({ logs, isLoading }: { logs: ILogEntry[]; isLoading: boolean }) {
  const [isEditId, setIsEditId] = useState<string>()
  const [isDeletedId, setIsDeletedId] = useState<string>()

  if (isLoading) return <TbodySkeleton />
  if (logs.length === 0) return <TbodyEmpty />

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {logs.map(({ Owner, LogText, CreatedAt, UpdatedAt, id }) => (
        <tr key={id} className="hover:bg-gray-50 transition-colors duration-150 text-sm">
          <td className="px-6 py-4 whitespace-nowrap">{Owner}</td>
          <td className="px-6 py-4">{LogText}</td>
          <td className="px-6 py-4">{new Date(CreatedAt).toLocaleString()}</td>
          <td className="px-6 py-4">{new Date(UpdatedAt).toLocaleString()}</td>
          <td className="whitespace-nowrap space-x-1 px-6">
            <Button onClick={() => setIsEditId(id)} theme="secondary" size="sm">
              ✏️ Edit
            </Button>
            <Button onClick={() => setIsDeletedId(id)} theme="secondary" size="sm">
              🗑️ Delete
            </Button>
          </td>
        </tr>
      ))}
      <Modal isShowing={!!isEditId} closeModal={() => setIsEditId(undefined)}>
        <EditLogForm id={isEditId ?? ''} closeModal={() => setIsEditId(undefined)} />
      </Modal>
      <Modal isShowing={!!isDeletedId} closeModal={() => setIsDeletedId(undefined)}>
        <ConfirmDelete id={isDeletedId ?? ''} closeModal={() => setIsDeletedId(undefined)} />
      </Modal>
    </tbody>
  )
}
