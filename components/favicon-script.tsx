"use client"

import { useEffect } from "react"

export function FaviconScript() {
  useEffect(() => {
    // Remove any existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]')
    existingLinks.forEach((link) => link.remove())

    // Create a new link element
    const link = document.createElement("link")
    link.rel = "icon"
    link.type = "image/png"
    link.href =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AV%20favicon-FWdgglhaNmL080fqQbkTJ1M0HTfOqx.png"

    // Add it to the document head
    document.head.appendChild(link)

    console.log(
      "Favicon set dynamically to https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AV%20favicon-FWdgglhaNmL080fqQbkTJ1M0HTfOqx.png",
    )
  }, [])

  return null
}

export default FaviconScript
