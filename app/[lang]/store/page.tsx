import { Suspense } from "react"
import { getProductsFromNotion } from "@/lib/notion"
import { formatCurrencyServer } from "@/lib/server-utils"
import { getDictionary } from "@/lib/dictionaries"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, ExternalLink } from "lucide-react"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"

interface StorePageProps {
  params: {
    lang: "pt" | "en"
  }
}

async function ProductGrid({ lang }: { lang: "pt" | "en" }) {
  try {
    const products = await getProductsFromNotion(lang)

    if (!products || products.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {lang === "en" ? "No products available" : "Nenhum produto disponível"}
            </h3>
            <p className="text-gray-500">
              {lang === "en"
                ? "Check back later for new digital products and resources."
                : "Volte mais tarde para novos produtos digitais e recursos."}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-gray-100">
              {product.imageUrl ? (
                <Image src={product.imageUrl || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ShoppingCart className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {lang === "en" ? "Digital" : "Digital"}
                </Badge>
              </div>
              <CardDescription className="line-clamp-3">{product.description}</CardDescription>
            </CardHeader>

            <CardContent>
              {product.features && (
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">
                    {lang === "en" ? "Features:" : "Características:"}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.features}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">(4.9)</span>
                </div>
                {product.price && (
                  <span className="text-2xl font-bold text-purple-600">{formatCurrencyServer(product.price)}</span>
                )}
              </div>
            </CardContent>

            <CardFooter className="space-y-2">
              {product.stripePaymentLink ? (
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <a href={product.stripePaymentLink} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {lang === "en" ? "Buy Now" : "Comprar Agora"}
                  </a>
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={`/${lang}/store/${product.slug}`}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {lang === "en" ? "View Details" : "Ver Detalhes"}
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error loading products:", error)
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-800 mb-2">
              {lang === "en" ? "Failed to load products" : "Falha ao carregar produtos"}
            </h3>
            <p className="text-red-600 text-sm mb-4">
              {lang === "en"
                ? "Please check your Notion API token, database ID, and network connection."
                : "Verifique o token da API do Notion, ID da base de dados e ligação à rede."}
            </p>
            <p className="text-red-600 text-sm">
              {lang === "en"
                ? "Please ensure your Notion API token and Database ID are correct and the database has published entries."
                : "Certifique-se de que o token da API do Notion e o ID da base de dados estão corretos e que a base de dados tem entradas publicadas."}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

function LoadingSkeleton() {
  return (
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
  )
}

export default async function StorePage({ params }: StorePageProps) {
  const { lang } = params
  let dict

  try {
    dict = await getDictionary(lang)
  } catch (error) {
    console.error("Error loading dictionary:", error)
    dict = {
      store: {
        title: lang === "en" ? "Digital Store" : "Loja Digital",
        seoHeading: lang === "en" ? "Digital products and services" : "Produtos e serviços digitais",
        noProductsFound: lang === "en" ? "No products found" : "Nenhum produto encontrado",
        buyButton: lang === "en" ? "Buy" : "Comprar",
      },
      footer: {},
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Header */}
      <div className="bg-white shadow-sm pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {dict?.store?.title || (lang === "en" ? "Digital Store" : "Loja Digital")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {dict?.store?.seoHeading ||
                (lang === "en"
                  ? "Discover our collection of digital products, templates, and resources designed to help your business grow."
                  : "Descubra a nossa coleção de produtos digitais, templates e recursos criados para ajudar o seu negócio a crescer.")}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductGrid lang={lang} />
        </Suspense>
      </div>

      {/* Payment Methods */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {lang === "en" ? "Secure Payment Methods" : "Métodos de Pagamento Seguros"}
            </h3>
            <div className="flex justify-center items-center space-x-6 opacity-60">
              <Image src="/images/payment-methods/visa.png" alt="Visa" width={60} height={40} />
              <Image src="/images/payment-methods/mastercard.png" alt="Mastercard" width={60} height={40} />
              <Image src="/images/payment-methods/paypal.png" alt="PayPal" width={60} height={40} />
              <Image src="/images/payment-methods/klarna.png" alt="Klarna" width={60} height={40} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
