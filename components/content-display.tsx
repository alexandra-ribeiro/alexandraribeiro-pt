"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface ContentDisplayProps {
  storageKey: string
  field: string
  fallback: string
  className?: string
  children: React.ReactNode
}

export default function ContentDisplay({ storageKey, field, fallback, className = "", children }: ContentDisplayProps) {
  const [content, setContent] = useState<string>(fallback)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Function to load content
    const loadContent = () => {
      try {
        if (typeof window === "undefined") {
          setContent(fallback)
          setIsLoaded(true)
          return
        }

        const storagePrefix = "va_content_"
        const fullKey = `${storagePrefix}${storageKey}`
        const storedData = localStorage.getItem(fullKey)

        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData)
            if (parsedData && parsedData[field]) {
              setContent(parsedData[field])
              setIsLoaded(true)
              return
            }
          } catch (parseError) {
            console.error(`Error parsing content for ${storageKey}.${field}:`, parseError)
          }
        }

        // If we couldn't get content from localStorage, use the fallback
        setContent(fallback)
        setIsLoaded(true)
      } catch (error) {
        console.error(`Error loading content for ${storageKey}.${field}:`, error)
        setContent(fallback)
        setIsLoaded(true)
      }
    }

    // Load content initially
    loadContent()

    // Set up storage event listener to update content when it changes in another tab
    const handleStorageChange = (event: StorageEvent) => {
      const storagePrefix = "va_content_"
      if (event.key && event.key === `${storagePrefix}${storageKey}`) {
        loadContent()
      }
    }

    setIsClient(true)

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange)
      return () => {
        window.removeEventListener("storage", handleStorageChange)
      }
    }
  }, [storageKey, field, fallback])

  // Return the fallback until client-side code runs
  if (!isClient) {
    return <div>Loading...</div>
  }

  if (!isLoaded) {
    return <span className={className}>{fallback}</span>
  }

  return <span className={className}>{content}</span>
}
