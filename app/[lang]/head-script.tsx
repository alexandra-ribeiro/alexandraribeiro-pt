"use client"

import { useEffect } from "react"

export default function HeadScript() {
  useEffect(() => {
    // Create a new link element
    const link = document.createElement("link")
    link.rel = "icon"
    link.href = "/favicon.ico"

    // Append to the head
    document.head.appendChild(link)
  }, [])

  return null
}
