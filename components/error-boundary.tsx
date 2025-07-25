"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Error caught by boundary:", event.error)
      setError(event.error)
      setHasError(true)
      event.preventDefault()
    }

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason)
      setError(new Error(event.reason))
      setHasError(true)
      event.preventDefault()
    }

    window.addEventListener("error", errorHandler)
    window.addEventListener("unhandledrejection", unhandledRejectionHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler)
    }
  }, [])

  if (hasError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-red-600">Something went wrong</h2>
          <p className="mb-6 text-gray-700">
            We encountered an error while loading the page. This might be due to a temporary issue.
          </p>
          {error && (
            <div className="mb-6 rounded-md bg-gray-100 p-4">
              <p className="text-sm font-medium text-gray-800">Error details:</p>
              <p className="mt-1 text-sm text-gray-600">{error.message || "Unknown error"}</p>
            </div>
          )}
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button onClick={() => window.location.reload()} className="w-full">
              Refresh Page
            </Button>
            <Button onClick={() => (window.location.href = "/")} variant="outline" className="w-full">
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
