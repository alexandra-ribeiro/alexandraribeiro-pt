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
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          const data = JSON.parse(stored)
          if (data[field]) {
            setContent(data[field])
          }
        }
      }
    } catch (error) {
      console.error("Error loading content from storage:", error)
    }
  }, [storageKey, field])

  return <>{content}</>
}
