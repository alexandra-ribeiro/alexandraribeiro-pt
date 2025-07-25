"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"

interface ContentDisplayProps {
  storageKey?: string
  field?: string
  content: {
    pt?: string
    en?: string
  }
  fallback?: string
  className?: string
  children?: React.ReactNode
}

export default function ContentDisplay({
  storageKey,
  field,
  content,
  fallback = "",
  className = "",
  children,
}: ContentDisplayProps) {
  const { lang } = useLanguage()
  const [displayContent, setDisplayContent] = useState(fallback)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Function to load content
    const loadContent = () => {
      try {
        if (typeof window === "undefined") {
          setDisplayContent(fallback)
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
              setDisplayContent(parsedData[field])
              setIsLoaded(true)
              return
            }
          } catch (parseError) {
            console.error(`Error parsing content for ${storageKey}.${field}:`, parseError)
          }
        }

        // If we couldn't get content from localStorage, use the fallback
        setDisplayContent(fallback)
        setIsLoaded(true)
      } catch (error) {
        console.error(`Error loading content for ${storageKey}.${field}:`, error)
        setDisplayContent(fallback)
        setIsLoaded(true)
      }
    }

    // Load content initially
    if (storageKey && field) {
      loadContent()
    } else {
      const selectedContent = content[lang as keyof typeof content] || content.pt || content.en || fallback
      setDisplayContent(selectedContent)
      setIsLoaded(true)
    }

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
  }, [storageKey, field, content, lang, fallback])

  // Return the fallback until client-side code runs
  if (!isClient) {
    return <div>Loading...</div>
  }

  if (!isLoaded) {
    return <span className={className}>{fallback}</span>
  }

  return <span className={className}>{displayContent}</span>
}
