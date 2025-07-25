"use client"

import { createContext, useContext, type ReactNode } from "react"

interface LanguageContextType {
  lang: string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  lang: string
}

export function LanguageProvider({ children, lang }: LanguageProviderProps) {
  // Ensure lang is valid with fallback
  const validLang = lang === "en" ? "en" : "pt"

  return <LanguageContext.Provider value={{ lang: validLang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Provide fallback instead of throwing error
    return { lang: "pt" }
  }
  return context
}
