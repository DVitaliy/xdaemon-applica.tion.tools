export default function TbodySkeletonComponent() {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {[...Array(5)].map((_, i) => (
        <tr key={i}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="ml-3 h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-12"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}
