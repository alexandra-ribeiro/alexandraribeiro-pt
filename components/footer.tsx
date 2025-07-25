"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "./language-provider"
import type { FooterDict } from "@/lib/types"

interface FooterProps {
  dict: FooterDict
}

export default function Footer({ dict }: FooterProps) {
  const { lang } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`} className="inline-block mb-4">
              <Image
                src={lang === "en" ? "/images/logo-en.png" : "/images/logo-pt.png"}
                alt="Alexandra Ribeiro Logo"
                width={200}
                height={60}
                className="h-12 w-auto filter brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              {lang === "en"
                ? "Digital consultant and technical virtual assistant specializing in business automation and digital solutions."
                : "Consultora digital e assistente virtual técnica especializada em automação de negócios e soluções digitais."}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{lang === "en" ? "Contact" : "Contacto"}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <a href={`mailto:${dict.contact}`} className="text-gray-300 hover:text-white transition-colors">
                  {dict.contact}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-300">+351 XXX XXX XXX</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <span className="text-gray-300">Portugal</span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{lang === "en" ? "Legal" : "Legal"}</h3>
            <div className="space-y-2">
              <Link href={`/${lang}/privacy`} className="block text-gray-300 hover:text-white transition-colors">
                {dict.privacy}
              </Link>
              <Link href={`/${lang}/terms`} className="block text-gray-300 hover:text-white transition-colors">
                {dict.terms}
              </Link>
              <a
                href="https://www.livroreclamacoes.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {dict.complaintsBook}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Alexandra Ribeiro.{" "}
            {lang === "en" ? "All rights reserved." : "Todos os direitos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
