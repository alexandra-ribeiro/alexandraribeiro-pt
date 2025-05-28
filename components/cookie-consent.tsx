"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { X } from "lucide-react"

export default function CookieConsent({ dict }: { dict?: any }) {
  const [showConsent, setShowConsent] = useState(false)

  // Default fallback text if dict is not provided
  const defaultDict = {
    message: "We use cookies to improve your experience on our site.",
    privacyLink: "Privacy Policy",
    accept: "Accept",
    decline: "Decline",
  }

  // Use provided dict or fallback to default
  const cookieDict = dict || defaultDict

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            {cookieDict.message}{" "}
            <Link href={`/privacy`} className="text-primary hover:underline">
              {cookieDict.privacyLink}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={declineCookies}
            className="text-gray-600 border-gray-300 hover:bg-gray-100"
          >
            {cookieDict.decline}
          </Button>
          <Button size="sm" onClick={acceptCookies} className="bg-primary hover:bg-primary/90 text-white">
            {cookieDict.accept}
          </Button>
          <button onClick={declineCookies} className="text-gray-400 hover:text-gray-600" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
