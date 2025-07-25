import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function StoreLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="h-10 bg-gray-200 rounded animate-pulse mb-4 max-w-md mx-auto" />
            <div className="h-6 bg-gray-200 rounded animate-pulse max-w-2xl mx-auto" />
          </div>
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse" />
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
