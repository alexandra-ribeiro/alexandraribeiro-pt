"use client"

import { useEffect, useState } from "react"
import { getContent } from "@/lib/content-manager"

interface ClientContentLoaderProps {
  type: "home" | "about" | "services" | "contact" | "blog" | "faq" | "global"
  language: string
  field: string
  fallback: string
  as?: keyof JSX.IntrinsicElements
  className?: string
}

export function ClientContentLoader({
  type,
  language,
  field,
  fallback,
  as: Component = "span",
  className = "",
}: ClientContentLoaderProps) {
  const [content, setContent] = useState<string>(fallback)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Get content from localStorage
    const storedContent = getContent(type, language)

    if (storedContent && storedContent[field]) {
      setContent(storedContent[field])
    }

    setIsLoaded(true)
  }, [type, language, field])

  // Return the fallback until client-side code runs
  if (!isLoaded) {
    return <Component className={className}>{fallback}</Component>
  }

  return <Component className={className}>{content}</Component>
}
