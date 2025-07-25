"use client"

import { createContext, useContext, type ReactNode } from "react"

interface LanguageContextType {
  lang: string
  isPortuguese: boolean
  isEnglish: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  lang: string
}

export function LanguageProvider({ children, lang }: LanguageProviderProps) {
  // Ensure lang is valid
  const validLang = lang === "en" ? "en" : "pt"

  const value: LanguageContextType = {
    lang: validLang,
    isPortuguese: validLang === "pt",
    isEnglish: validLang === "en",
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Provide fallback values instead of throwing
    return {
      lang: "pt",
      isPortuguese: true,
      isEnglish: false,
    }
  }
  return context
}
