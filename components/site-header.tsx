"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLanguage } from "./language-provider"
import LanguageSwitcher from "./language-switcher"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function SiteHeader({ dict }: { dict: any }) {
  const pathname = usePathname()
  const { lang } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Verifica se a rota interna está ativa
  const isActive = (path: string) => {
    try {
      if (!pathname || !lang) return false
      if (path === "/") {
        return pathname === `/${lang}` || pathname === `/${lang}/`
      }
      return pathname.startsWith(`/${lang}${path}`)
    } catch {
      return false
    }
  }

  // Pega a navegação do dicionário (dictionaries/pt.json ou en.json)
  const safeNavigation = dict?.navigation || []

  return (
    <header className="w-full bg-white py-3 sm:py-5 sticky top-0 z-50 border-b border-border/10 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="relative">
          <div className="w-32 sm:w-40 md:w-52 h-auto">
            {lang === "pt" ? (
              <Image
                src="/images/logo-pt.png"
                alt="Alexandra Ribeiro"
                width={240}
                height={80}
                className="w-full h-auto"
                priority
                unoptimized
              />
            ) : (
              <Image
                src="/images/logo-en.png"
                alt="Alexandra Ribeiro"
                width={240}
                height={80}
                className="w-full h-auto"
                priority
                unoptimized
              />
            )}
          </div>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-10">
            {safeNavigation.map((item: any, index: number) => {
              const external = item.external === true
              const href = external ? item.path : `/${lang}${item.path || ""}`
              const active = !external && isActive(item.path || "")
              return (
                <li key={index}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium tracking-wide text-foreground/80 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={`
                        text-sm font-medium tracking-wide transition-colors hover:text-primary relative group ${
                          active ? "text-primary" : "text-foreground/80"
                        }`}
                    >
                      {item.label}
                      <span
                        className={`
                          absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                            active ? "w-full" : "w-0"
                          }`}
                      />
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Botão Mobile */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-primary"
          onClick={() => setIsMobileMenuOpen((o) => !o)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>

        {/* CTA e Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link href={`/${lang}/contact`} className="group">
            <button className="relative inline-flex h-8 sm:h-9 md:h-10 overflow-hidden rounded-md px-2 sm:px-4 md:px-6 py-1 sm:py-2 whitespace-nowrap text-xs sm:text-sm">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-primary rounded-md group-hover:bg-[#CC9E00]" />
              <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-transparent border-2 border-accent rounded-md group-hover:w-full" />
              <span className="relative text-white transition-colors duration-300 ease-out group-hover:text-primary">
                {dict?.headerCTA || "Contact"}
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Navegação Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border/10 shadow-lg z-40">
          <nav className="container mx-auto py-4 px-4">
            <ul className="space-y-4">
              {safeNavigation.map((item: any, index: number) => {
                const external = item.external === true
                const href = external ? item.path : `/${lang}${item.path || ""}`
                const active = !external && isActive(item.path || "")
                return (
                  <li key={index}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-base font-medium tracking-wide transition-colors hover:text-primary px-4 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className={`block text-base font-medium tracking-wide transition-colors hover:text-primary px-4 py-2 ${
                          active ? "text-primary bg-primary/5" : "text-foreground/80"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
              <li className="px-4 py-2 border-t border-border/10 mt-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground/60">Language:</span>
                  <LanguageSwitcher />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
