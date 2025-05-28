"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type LanguageContextType = {
  lang: string
  setLanguage: (lang: string) => void
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
  lang: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLang, setCurrentLang] = useState(lang)

  // Add error handling for language switching
  const setLanguage = (newLang: string) => {
    try {
      setCurrentLang(newLang)
      if (pathname && router) {
        const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
        router.push(newPath)
      }
    } catch (error) {
      console.error("Error switching language:", error)
    }
  }

  // Sync with prop changes
  useEffect(() => {
    if (lang !== currentLang) {
      setCurrentLang(lang)
    }
  }, [lang])

  return <LanguageContext.Provider value={{ lang: currentLang, setLanguage }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    console.error("Error using language context: Context is undefined")
    return { lang: "pt", setLanguage: () => {} }
  }
  return context
}
