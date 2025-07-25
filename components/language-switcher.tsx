"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const { lang } = useLanguage()

  const switchLanguage = () => {
    try {
      const newLang = lang === "pt" ? "en" : "pt"
      const currentPath = pathname.replace(/^\/(pt|en)/, "")
      const newPath = `/${newLang}${currentPath}`
      router.push(newPath)
    } catch (error) {
      console.error("Error switching language:", error)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={switchLanguage} className="text-xs font-medium bg-transparent">
      {lang === "pt" ? "EN" : "PT"}
    </Button>
  )
}
