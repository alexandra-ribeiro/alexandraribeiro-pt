import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

interface ProductDetailsProps {
  product: {
    id: string
    title: string
    description: any
    price: number
    features: any
    link: any
    image?: string | null
    category?: { name: string; slug: string } | null
    slug: string
  }
  lang: string
  dict: any
}

export default function ProductDetails({ product, lang, dict }: ProductDetailsProps) {
  if (!product) {
    return <div className="container mx-auto py-8 text-center text-gray-500">Product not found.</div>
  }

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="mb-4">{children}</p>,
      [BLOCKS.UL_LIST]: (node: any, children: any) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
      [BLOCKS.OL_LIST]: (node: any, children: any) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li className="mb-2">{children}</li>,
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {children}
        </a>
      ),
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="flex flex-col lg:flex-row gap-8 p-6">
        <div className="lg:w-1/2">
          <div className="relative w-full h-80 sm:h-96 lg:h-[400px] overflow-hidden rounded-lg mb-6">
            {product.image ? (
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                className="bg-gray-100"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                <Image src="/images/logo-pt.png" alt="Logo Watermark" width={120} height={120} className="opacity-20" />
              </div>
            )}
          </div>
          {product.category && (
            <span className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mb-4">
              {product.category.name}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <div className="text-gray-700 text-lg leading-relaxed mb-6">
            {product.description && documentToReactComponents(product.description, renderOptions)}
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <Card className="p-6 flex-grow">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-primary mb-2">
                {formatCurrency(product.price, lang)}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">{dict.productDetails.whatsIncluded}</h2>
              <div className="text-gray-700 mb-6">
                {product.features && documentToReactComponents(product.features, renderOptions)}
              </div>
              {product.link && <div className="mt-auto">{documentToReactComponents(product.link, renderOptions)}</div>}
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  )
}
