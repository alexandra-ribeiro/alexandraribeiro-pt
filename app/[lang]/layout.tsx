import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"
import { getDictionary } from "@/lib/dictionaries"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  try {
    const dict = await getDictionary(params.lang as "pt" | "en")
    return {
      title: dict.metadata?.title || "Alexandra Ribeiro | Consultora Digital",
      description: dict.metadata?.description || "Digital consulting services",
      icons: {
        icon: [
          { url: "/favicon.ico" },
          {
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AV%20favicon-FWdgglhaNmL080fqQbkTJ1M0HTfOqx.png",
            type: "image/png",
          },
        ],
        apple: [{ url: "/apple-touch-icon.png" }],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Alexandra Ribeiro | Consultora Digital",
      description: "Digital consulting services",
    }
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const validLang = params?.lang || "pt"

  return (
    <html lang={validLang} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AV%20favicon-FWdgglhaNmL080fqQbkTJ1M0HTfOqx.png"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" suppressColorSchemeWarning>
            <LanguageProvider>
              {children}
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
