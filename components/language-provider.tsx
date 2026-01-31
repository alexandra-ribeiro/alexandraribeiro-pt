"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type LanguageContextType = {
  lang: "pt" | "en"
  setLanguage: (lang: "pt" | "en") => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "pt",
  setLanguage: () => {},
})

export function LanguageProvider({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: "pt" | "en"
}) {
  const [currentLang, setCurrentLang] = useState(lang)

  useEffect(() => {
    setCurrentLang(lang)
  }, [lang])

  return (
    <LanguageContext.Provider
      value={{ lang: currentLang, setLanguage: setCurrentLang }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
