"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./language-switcher"

interface SiteHeaderProps {
  dict: any
}

export default function SiteHeader({ dict }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState("pt")

  useEffect(() => {
    // Get language from pathname
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname
      const lang = pathname.startsWith("/en") ? "en" : "pt"
      setCurrentLang(lang)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { label: currentLang === "en" ? "Home" : "Início", path: `/${currentLang}` },
    { label: currentLang === "en" ? "About" : "Sobre", path: `/${currentLang}/about` },
    { label: currentLang === "en" ? "Services" : "Serviços", path: `/${currentLang}/services` },
    { label: "Portfolio", path: `/${currentLang}/portfolio` },
    { label: "Blog", path: `/${currentLang}/blog` },
    { label: currentLang === "en" ? "Store" : "Loja", path: `/${currentLang}/store` },
    { label: currentLang === "en" ? "Contact" : "Contacto", path: `/${currentLang}/contact` },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${currentLang}`} className="flex-shrink-0">
            <Image
              src={currentLang === "en" ? "/images/logo-en.png" : "/images/logo-pt.png"}
              alt="Alexandra Ribeiro"
              width={180}
              height={60}
              className="h-8 lg:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Language Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Link href={`/${currentLang}/contact`}>{currentLang === "en" ? "Contact" : "Contactar"}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href={`/${currentLang}/contact`} onClick={() => setIsMenuOpen(false)}>
                    {currentLang === "en" ? "Contact" : "Contactar"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
