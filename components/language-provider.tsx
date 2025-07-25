"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LanguageContextType {
  lang: string
  setLang: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "pt",
  setLang: () => {},
})

export function useLanguage() {
  return useContext(LanguageContext)
}

interface LanguageProviderProps {
  children: React.ReactNode
  lang?: string
}

export function LanguageProvider({ children, lang: initialLang }: LanguageProviderProps) {
  const [lang, setLang] = useState(initialLang || "pt")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname
      const detectedLang = pathname.startsWith("/en") ? "en" : "pt"
      setLang(detectedLang)
    }
  }, [])

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}
