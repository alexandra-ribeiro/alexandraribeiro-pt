"use client"

import type React from "react"

import { useLanguage } from "./language-provider"

interface ContentDisplayProps {
  ptContent: string
  enContent: string
  className?: string
}

export function ContentDisplay({ ptContent, enContent, className = "" }: ContentDisplayProps) {
  const { language } = useLanguage()

  return <div className={className}>{language === "pt" ? ptContent : enContent}</div>
}

interface ContentSectionProps {
  children: React.ReactNode
  className?: string
}

export function ContentSection({ children, className = "" }: ContentSectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
