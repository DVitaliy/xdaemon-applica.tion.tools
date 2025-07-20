import { getPaginationRange } from '@/lib/paginationHint'
import { useLogsStore } from '@/store/useLogsStore'
import Button from '@/components/ui/Button'

export default function PaginationLayout() {
  const { logs, page, limit, setPage } = useLogsStore()
  const totalPages = Math.ceil(logs.length / limit)
  if (logs.length === 0 || totalPages === 1) return null

  const paginationRange = getPaginationRange({ total: totalPages, current: page })

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {paginationRange.map((p) => (
          <li key={p}>
            <Button theme={page === p ? 'primary' : 'secondary'} onClick={() => setPage(p)}>
              {p}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
