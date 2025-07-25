import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alexandra Ribeiro | Consultora Digital e Assistente Virtual Técnica em Portugal",
  description: "Digital consulting and simplified systems implementation for entrepreneurs and online stores",
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

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Ensure lang parameter is valid and provide fallback
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
            <LanguageProvider lang={validLang}>
              {children}
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
