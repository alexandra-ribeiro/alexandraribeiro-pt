import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"
import { FormsAppWidget } from "@/components/forms-app-widget"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang === "en" ? "en" : "pt"

  const baseUrl = "https://www.alexandraribeiro.pt"

  return {
    title: "Alexandra Ribeiro | Consultora Digital e Assistente Virtual Técnica em Portugal",
    description:
      "Digital consulting and simplified systems implementation for entrepreneurs and online stores",
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        pt: `${baseUrl}/pt`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/pt`,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        {
          url: "/images/av-20favicon.png",
          type: "image/png",
        },
      ],
      apple: [{ url: "/apple-touch-icon.png" }],
    },
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
  const htmlLang = validLang === "pt" ? "pt-PT" : "en"

  return (
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" suppressColorSchemeWarning>
            <LanguageProvider lang={validLang}>
              {children}
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
  )
}
