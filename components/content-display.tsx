"use client"

import { useState, useEffect } from "react"

interface ContentDisplayProps {
  storageKey: string
  field: string
  fallback: string
}

export default function ContentDisplay({ storageKey, field, fallback }: ContentDisplayProps) {
  const [content, setContent] = useState(fallback)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          const data = JSON.parse(stored)
          if (data[field]) {
            setContent(data[field])
          }
        }
      } catch (error) {
        console.error("Error loading content from localStorage:", error)
      }
    }
  }, [storageKey, field])

  return <>{content}</>
}
