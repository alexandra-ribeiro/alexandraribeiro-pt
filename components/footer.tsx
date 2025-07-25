"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"

export default function Footer({ dict }: { dict: any }) {
  const { lang } = useLanguage()
  const currentYear = new Date().getFullYear()

  const logoSrc = lang === "pt" ? "/images/logo-pt.png" : "/images/logo-en.png"

  return (
    <footer className="bg-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <Link href={`/${lang}`} className="mb-4">
            <Image src={logoSrc || "/placeholder.svg"} alt="Logo" width={150} height={50} />
          </Link>
          <p className="text-sm text-gray-600 text-center md:text-left">
            &copy; {currentYear} Alexandra Ribeiro.{" "}
            {lang === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {lang === "pt" ? "Links Rápidos" : "Quick Links"}
          </h3>
          <nav className="flex flex-col gap-2 text-center md:text-left">
            {dict.links.map((item: any) => (
              <Link key={item.url} href={`/${lang}${item.url}`} className="text-gray-600 hover:text-gray-900">
                {item.text}
              </Link>
            ))}
            <Link href={`/${lang}/store`} className="text-gray-600 hover:text-gray-900">
              {lang === "pt" ? "Loja" : "Store"}
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{lang === "pt" ? "Contacto" : "Contact"}</h3>
          <p className="text-gray-600 text-center md:text-left">{dict.contact}</p>
          <div className="flex gap-4 mt-4">
            {/* Social media icons - placeholder */}
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              {/* <FacebookIcon className="h-6 w-6" /> */}
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              {/* <InstagramIcon className="h-6 w-6" /> */}
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              {/* <LinkedinIcon className="h-6 w-6" /> */}
            </Link>
          </div>
          <div className="mt-4 text-sm text-center md:text-left">
            <Link href={`/${lang}/privacy-policy`} className="text-gray-600 hover:text-gray-900 block">
              {dict.privacy}
            </Link>
            <Link href={`/${lang}/terms-conditions`} className="text-gray-600 hover:text-gray-900 block">
              {dict.terms}
            </Link>
            <Link
              href="https://www.livroreclamacoes.pt/inicio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 block"
            >
              {dict.complaintsBook}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
