"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"

type Language = "pt" | "en"

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  switchLanguage: (newLang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [lang, setLangState] = useState<Language>("pt")

  useEffect(() => {
    // Extract language from pathname
    const pathLang = pathname.split("/")[1]
    if (pathLang === "en" || pathLang === "pt") {
      setLangState(pathLang as Language)
    } else {
      setLangState("pt")
    }
  }, [pathname])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
  }

  const switchLanguage = (newLang: Language) => {
    const currentPath = pathname.replace(/^\/(pt|en)/, "")
    const newPath = `/${newLang}${currentPath}`
    router.push(newPath)
  }

  return <LanguageContext.Provider value={{ lang, setLang, switchLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Provide fallback values
    return {
      lang: "pt" as Language,
      setLang: () => {},
      switchLanguage: () => {},
    }
  }
  return context
}
