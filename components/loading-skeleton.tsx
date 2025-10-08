export function LoadingSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

