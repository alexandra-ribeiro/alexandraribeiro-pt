"use client"

export default function EnhancedDivider() {
  return (
    <div className="relative py-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white px-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
