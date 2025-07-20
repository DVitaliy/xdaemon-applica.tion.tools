export default function TbodyEmptyComponent() {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
          No log entries found. Create your first log entry to get started.
        </td>
      </tr>
    </tbody>
  )
}
