import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alexandra Ribeiro | Consultora Digital e Assistente Virtual Técnica em Portugal",
  description: "Digital consulting and simplified systems implementation for entrepreneurs and online stores",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}


import './globals.css'