import type React from "react"
import type { Metadata } from "next"
import { Mulish } from "next/font/google"
import "../[lang]/globals.css"
import { Toaster } from "@/components/ui/toaster"
import SessionProvider from "@/components/auth/session-provider"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const mulish = Mulish({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard | Alexandra Ribeiro",
  description: "Painel administrativo do site Alexandra Ribeiro",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={mulish.className}>
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
