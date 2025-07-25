import { getDictionary } from "@/lib/dictionaries"
import { getProductsFromNotion, type Product } from "@/lib/notion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button" // Import Button component

interface StorePageProps {
  params: { lang: "pt" | "en" }
}

export default async function StorePage({ params: { lang } }: StorePageProps) {
  const dict = await getDictionary(lang)
  let products: Product[] = []
  let errorMessage: string | null = null

  try {
    products = await getProductsFromNotion(lang)
    if (products.length === 0) {
      errorMessage =
        dict?.store?.noProductsFound?.[lang as keyof typeof dict.store.noProductsFound] ||
        "No products are currently available. Please ensure your Notion database has published entries for the 'products' content type with the correct language checkbox checked."
    }
  } catch (error: any) {
    console.error("Error fetching store data:", error)
    errorMessage = `Failed to load products: ${error.message}. Please check your Notion API token, database ID, and network connection.`
  }

  return (
    <main className="min-h-screen flex flex-col">
      <SiteHeader dict={dict} />
      <div className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">{dict?.store?.title || "Digital Store"}</h1>
        <h2 className="text-xl text-gray-600 max-w-2xl mx-auto text-center">
          {dict?.store?.seoHeading ||
            "Unlock your business potential with our expert digital consulting, technical virtual assistance, beginner e-books for entrepreneurs, and seamless setup services for domain, hosting, WordPress, CRM, and invoice software."}
        </h2>

        {errorMessage ? (
          <div className="text-center text-red-600 text-lg mt-8">
            <p>{errorMessage}</p>
            <p className="mt-2">
              Please ensure your Notion API token and Database ID are correct and the database has published entries.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600 text-lg mt-8">
            <p>{dict?.store?.noProductsFound || "No products are currently available."}</p>
            <p className="mt-2">
              {lang === "pt"
                ? "Por favor, certifique-se de que o seu banco de dados Notion tem entradas publicadas para produtos na categoria 'products'."
                : "Please ensure your Notion database has published entries for products in the 'products' category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {products.map((product) => (
              <Card key={product.id} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  {product.imageUrl && (
                    <div className="relative w-full aspect-square h-48 mb-4 rounded-md overflow-hidden">
                      <Image
                        src={product.imageUrl || "/placeholder.svg?height=400&width=400&text=Product Image"}
                        alt={product.title}
                        fill
                        objectFit="contain"
                        className=""
                      />
                    </div>
                  )}
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex flex-col flex-grow">
                  {product.price !== null && (
                    <p className="text-lg font-bold text-gray-800 mb-4">
                      {formatCurrency(product.price, lang === "pt" ? "pt" : "en")}
                    </p>
                  )}
                  {/* Buy button added here */}
                  <Link href={`/${lang}/store/${product.slug}`} passHref className="mt-auto">
                    <Button className="w-full">{dict?.store?.buyButton}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer dict={dict?.footer} />
    </main>
  )
}
