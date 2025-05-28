"use client"

import { useEffect } from "react"

export default function ForceRefresh() {
  useEffect(() => {
    // This will force the browser to reload the page from the server
    // instead of using the cached version
    if (typeof window !== "undefined") {
      const wasCleared = localStorage.getItem("va_blog_cleared_at")

      if (wasCleared) {
        const clearedTime = Number.parseInt(wasCleared, 10)
        const now = Date.now()

        // If cleared in the last 5 minutes, force a hard reload
        if (now - clearedTime < 5 * 60 * 1000) {
          console.log("Blog storage was recently cleared, forcing page reload")

          // Clear the flag so we don't reload again
          localStorage.removeItem("va_blog_cleared_at")

          // Force reload without cache
          window.location.reload(true)
        }
      }
    }
  }, [])

  return null
}
