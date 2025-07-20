export default function HeaderComponent() {
  return (
    <header
      className="bg-white shadow-sm border-b border-gray-200
                mb-6 sm:mb-9">
      <div className="flex justify-between items-center h-12 sm:h-16 container mx-auto">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="flex-shrink-0 text-xl sm:text-3xl">📋</div>
          <h1 className="text-lg sm:text-xl font-semibold truncate">Log Management System</h1>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="text-lg">⚤</span>
          <span>Admin</span>
        </div>
      </div>
    </header>
  )
}
