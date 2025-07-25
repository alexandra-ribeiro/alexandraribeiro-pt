"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

interface FooterProps {
  dict: any
}

export default function Footer({ dict }: FooterProps) {
  const [currentLang, setCurrentLang] = useState("pt")

  useEffect(() => {
    // Get language from pathname
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname
      const lang = pathname.startsWith("/en") ? "en" : "pt"
      setCurrentLang(lang)
    }
  }, [])

  const currentYear = new Date().getFullYear()

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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href={`/${currentLang}`} className="inline-block mb-4">
              <Image
                src={currentLang === "en" ? "/images/logo-en.png" : "/images/logo-pt.png"}
                alt="Alexandra Ribeiro"
                width={200}
                height={67}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              {currentLang === "en"
                ? "Digital Consultant and Technical Virtual Assistant specialized in systems implementation and professional online identity."
                : "Consultora Digital e Assistente Virtual Técnica especializada em implementação de sistemas e identidade profissional online."}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/alexandraribeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/alexandraribeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/in/alexandraribeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentLang === "en" ? "Navigation" : "Navegação"}</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentLang === "en" ? "Contact" : "Contacto"}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:info@alexandraribeiro.pt" className="text-gray-300 hover:text-white transition-colors">
                  info@alexandraribeiro.pt
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400" />
                <a href="tel:+351123456789" className="text-gray-300 hover:text-white transition-colors">
                  +351 123 456 789
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-gray-300">Portugal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Alexandra Ribeiro.{" "}
              {currentLang === "en" ? "All rights reserved." : "Todos os direitos reservados."}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href={`/${currentLang}/privacy`} className="text-gray-400 hover:text-white transition-colors">
                {currentLang === "en" ? "Privacy Policy" : "Política de Privacidade"}
              </Link>
              <Link href={`/${currentLang}/terms`} className="text-gray-400 hover:text-white transition-colors">
                {currentLang === "en" ? "Terms & Conditions" : "Termos e Condições"}
              </Link>
              <a
                href="https://www.livroreclamacoes.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {currentLang === "en" ? "Complaints Book" : "Livro de Reclamações"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
