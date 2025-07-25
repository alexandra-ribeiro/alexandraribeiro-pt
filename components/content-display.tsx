"use client"

import { useState, useEffect } from "react"

interface ContentDisplayProps {
  content: string
  className?: string
}

export default function ContentDisplay({ content, className = "" }: ContentDisplayProps) {
  const [displayContent, setDisplayContent] = useState("")

  useEffect(() => {
    // Safely handle content on client side
    if (typeof window !== "undefined") {
      setDisplayContent(content || "")
    }
  }, [content])

  if (!displayContent) {
    return <div className={`animate-pulse bg-gray-200 h-4 rounded ${className}`} />
  }

  return <div className={className} dangerouslySetInnerHTML={{ __html: displayContent }} />
}
