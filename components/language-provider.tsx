"use client"

import { createContext, useContext, type ReactNode } from "react"

type Language = "pt" | "en"

interface LanguageContextType {
  lang: Language
  setLang?: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "pt",
})

interface LanguageProviderProps {
  children: ReactNode
  lang: string
}

export function LanguageProvider({ children, lang }: LanguageProviderProps) {
  const validLang: Language = lang === "en" ? "en" : "pt"

  return <LanguageContext.Provider value={{ lang: validLang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    return { lang: "pt" as Language }
  }
  return context
}
