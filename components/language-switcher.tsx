"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLang, setCurrentLang] = useState("pt")

  useEffect(() => {
    const lang = pathname.startsWith("/en") ? "en" : "pt"
    setCurrentLang(lang)
  }, [pathname])

  const switchLanguage = (newLang: string) => {
    let newPath = pathname

    if (currentLang === "pt" && newLang === "en") {
      newPath = `/en${pathname}`
    } else if (currentLang === "en" && newLang === "pt") {
      newPath = pathname.replace(/^\/en/, "") || "/"
    }

    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Globe size={16} />
          <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("pt")} className={currentLang === "pt" ? "bg-gray-100" : ""}>
          🇵🇹 Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("en")} className={currentLang === "en" ? "bg-gray-100" : ""}>
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
