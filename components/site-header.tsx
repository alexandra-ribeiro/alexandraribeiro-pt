"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "./language-provider"

export default function SiteHeader({ dict }: { dict: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const { lang } = useLanguage()

  // Provide fallback values to prevent errors
  const navigation = dict?.navigation || []
  const headerCTA = dict?.headerCTA || (lang === "pt" ? "Contactar" : "Contact")

  const logoSrc = lang === "pt" ? "/images/logo-pt.png" : "/images/logo-en.png"

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image src={logoSrc || "/placeholder.svg"} alt="Logo" width={120} height={40} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item: any) => (
            <Link
              key={item.path}
              href={`/${lang}${item.path}`}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {item.path === "/" || item.path === "" ? (lang === "pt" ? "Início" : "Home") : item.label}
            </Link>
          ))}
          <Link href={`/${lang}/store`} className="text-sm font-medium hover:underline underline-offset-4">
            {lang === "pt" ? "Loja" : "Store"}
          </Link>
          <Button asChild className="bg-[#CC9E00] hover:bg-primary hover:text-white text-primary">
            <Link href={`/${lang}/contact`}>{headerCTA}</Link>
          </Button>
          <LanguageSwitcher />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 p-4">
                {navigation.map((item: any) => (
                  <Link
                    key={item.path}
                    href={`/${lang}${item.path}`}
                    className="text-lg font-medium hover:underline underline-offset-4"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.path === "/" || item.path === "" ? (lang === "pt" ? "Início" : "Home") : item.label}
                  </Link>
                ))}
                <Link
                  href={`/${lang}/store`}
                  className="text-lg font-medium hover:underline underline-offset-4"
                  onClick={() => setIsOpen(false)}
                >
                  {lang === "pt" ? "Loja" : "Store"}
                </Link>
                <Button asChild className="bg-[#CC9E00] hover:bg-primary hover:text-white text-primary mt-4">
                  <Link href={`/${lang}/contact`} onClick={() => setIsOpen(false)}>
                    {headerCTA}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
