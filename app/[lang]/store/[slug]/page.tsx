import { getDictionary } from "@/lib/dictionaries"
import { getProductBySlugFromNotion } from "@/lib/notion"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button" // Import the Button component

interface ProductDetailPageProps {
  params: {
    lang: "pt" | "en"
    slug: string
  }
}

export default async function ProductDetailPage({ params: { lang, slug } }: ProductDetailPageProps) {
  const dict = await getDictionary(lang)
  const product = await getProductBySlugFromNotion(slug, lang)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <SiteHeader dict={dict} />
      <div className="flex-grow container mx-auto py-12 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.title}
                fill
                objectFit="cover"
                className="bg-gray-100"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 text-xl">
                {dict?.product?.noImage || "No Image Available"}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
            {product.price !== null && (
              <p className="text-3xl font-bold text-gray-800">
                {formatCurrency(product.price, lang === "pt" ? "pt" : "en")}
              </p>
            )}
            <div className="text-gray-700 leading-relaxed prose prose-lg max-w-none">
              <p>{product.description}</p>
            </div>

            {/* New section for "What's included" - Corrected to handle Notion rich text */}
            {product.features && (
              <div className="mt-6">
                <p className="text-gray-700 leading-relaxed prose prose-lg max-w-none">{product.features}</p>
              </div>
            )}

            {/* Render a custom button if stripePaymentLink is available */}
            {product.stripePaymentLink && (
              <div className="mt-6 flex flex-col items-center gap-4">
                <Button
                  asChild
                  className="w-full md:w-auto px-8 py-3 text-lg font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ backgroundColor: "#003366", color: "#ffffff" }}
                >
                  <a href={product.stripePaymentLink} target="_blank" rel="noopener noreferrer">
                    {lang === "pt" ? "Comprar" : "Buy Now"}
                  </a>
                </Button>
                <div className="text-sm text-gray-500 mt-2">
                  {lang === "pt" ? "Métodos de pagamento aceites" : "Supported payment methods"}
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Image
                    src="/images/payment-methods/visa.png"
                    alt="Visa"
                    width={40}
                    height={24}
                    className="h-6 object-contain"
                  />
                  <Image
                    src="/images/payment-methods/mastercard.png"
                    alt="Mastercard"
                    width={40}
                    height={24}
                    className="h-6 object-contain"
                  />
                  <Image
                    src="/images/payment-methods/google-pay.svg"
                    alt="Google Pay"
                    width={40}
                    height={24}
                    className="h-6 object-contain"
                  />
                  <Image
                    src="/images/payment-methods/paypal.png"
                    alt="PayPal"
                    width={40}
                    height={24}
                    className="h-6 object-contain"
                  />
                  <Image
                    src="/images/payment-methods/klarna.png"
                    alt="Klarna"
                    width={40}
                    height={24}
                    className="h-6 object-contain"
                  />
                </div>
              </div>
            )}
            {/* Fallback to original linkHtml rendering if stripePaymentLink is not present but linkHtml is */}
            {product.linkHtml && !product.stripePaymentLink && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dict?.product?.buyNow || "Buy Now"}</h2>
                <div dangerouslySetInnerHTML={{ __html: product.linkHtml }} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer dict={dict?.footer} />
    </main>
  )
}
