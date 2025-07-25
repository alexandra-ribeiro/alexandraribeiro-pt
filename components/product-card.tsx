import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: {
    id: string
    title: string
    description: string
    price: number
    image?: string | null
    slug: string
  }
  lang: string
}

export default function ProductCard({ product, lang }: ProductCardProps) {
  return (
    <Link href={`/${lang}/store/${product.slug}`} className="group">
      <Card className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <div className="relative h-48 w-full overflow-hidden">
          {product.image ? (
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">No Image</div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
          <div className="mt-3 text-lg font-bold text-gray-800">€{product.price.toFixed(2)}</div>
        </CardContent>
      </Card>
    </Link>
  )
}
