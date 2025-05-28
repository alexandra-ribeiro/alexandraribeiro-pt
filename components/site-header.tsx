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

  // Add error handling for navigation
  const isActive = (path: string) => {
    try {
      if (!pathname || !lang) return false

      if (path === "/") {
        return pathname === `/${lang}` || pathname === `/${lang}/`
      }
      return pathname.startsWith(`/${lang}${path}`)
    } catch (error) {
      console.error("Error checking active path:", error)
      return false
    }
  }

  // Add error handling for navigation items
  const safeNavigation = dict?.navigation || []

  return (
    <header className="w-full bg-white py-3 sm:py-5 sticky top-0 z-50 border-b border-border/10 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="relative">
          <div className="w-32 sm:w-40 md:w-52 h-auto">
            {lang === "pt" ? (
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20PT-SmF3uKcjepFjWzjFwedKj6KyRTkwXv.png"
                alt="Alexandra Ribeiro"
                width={240}
                height={80}
                className="w-full h-auto"
                priority
                unoptimized
              />
            ) : (
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20EN-Oe38yCmYI6QT53Sh3k0ZxYWFwp7Gzr.png"
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

        {/* Navigation */}
        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-10">
            {safeNavigation.map((item: any, index: number) => (
              <li key={item.path || index}>
                <Link
                  href={`/${lang}${item.path || ""}`}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary relative group ${
                    isActive(item.path || "") ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {item.label || ""}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                      isActive(item.path || "") ? "w-full" : "w-0"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>

        {/* CTA Button and Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link href={`/${lang}/contact`} className="group">
            <button className="relative inline-flex h-8 sm:h-9 md:h-10 overflow-hidden rounded-md px-2 sm:px-4 md:px-6 py-1 sm:py-2 whitespace-nowrap text-xs sm:text-sm">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-primary rounded-md group-hover:bg-[#CC9E00]"></span>
              <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-transparent border-2 border-accent rounded-md group-hover:w-full"></span>
              <span className="relative text-white transition-colors duration-300 ease-out group-hover:text-primary">
                {dict?.headerCTA || "Contact"}
              </span>
            </button>
          </Link>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border/10 shadow-lg z-40">
          <nav className="container mx-auto py-4 px-4">
            <ul className="space-y-4">
              {safeNavigation.map((item: any, index: number) => (
                <li key={item.path || index}>
                  <Link
                    href={`/${lang}${item.path || ""}`}
                    className={`block text-base font-medium tracking-wide transition-colors hover:text-primary px-4 py-2 ${
                      isActive(item.path || "") ? "text-primary bg-primary/5" : "text-foreground/80"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label || ""}
                  </Link>
                </li>
              ))}
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
