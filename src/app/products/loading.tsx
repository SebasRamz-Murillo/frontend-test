export default function Loading() {
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded mb-4" />
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  