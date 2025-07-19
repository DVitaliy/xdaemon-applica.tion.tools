export default function HeaderComponent() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center bg-amber-500">
          <div className="flex-shrink-0">📋</div>
          <div className="ml-3">
            <h1 className="text-xl font-semibold text-gray-900">Log Management System</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            ⚤<span>John Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}
