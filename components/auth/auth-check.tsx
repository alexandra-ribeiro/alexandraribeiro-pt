"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // This ensures we only run the redirect on the client
  useEffect(() => {
    setIsClient(true)

    if (isClient && status === "unauthenticated") {
      console.log("User is not authenticated, redirecting to login")
      router.push("/admin/login")
    }
  }, [status, router, isClient])

  // For development purposes, we'll add some logging
  useEffect(() => {
    if (status === "authenticated") {
      console.log("User is authenticated:", session)
    } else if (status === "loading") {
      console.log("Authentication status is loading...")
    }
  }, [status, session])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // For development purposes, we'll allow access even if not authenticated
  // In production, you would want to be more strict
  const isDevelopment = process.env.NODE_ENV === "development"
  if (isDevelopment || status === "authenticated") {
    return <>{children}</>
  }

  return null
}
