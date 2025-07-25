"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"

export default function LanguageSwitcher() {
  const { lang, switchLanguage } = useLanguage()

  const handleLanguageSwitch = () => {
    const newLang = lang === "pt" ? "en" : "pt"
    switchLanguage(newLang)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLanguageSwitch} className="text-xs font-medium bg-transparent">
      {lang === "pt" ? "EN" : "PT"}
    </Button>
  )
}
