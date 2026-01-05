"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Linkedin, Instagram, Mail, ChevronRight, ExternalLink, MapPin } from "lucide-react"
import CookieConsent from "./cookie-consent"
import PrivacyPolicyPopup from "./privacy-policy-popup"
import TermsConditionsPopup from "./terms-conditions-popup"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"

export default function Footer({ dict }: { dict: any }) {
  const email = "geral@alexandraribeiro.pt"
  const linkedinUrl = "https://www.linkedin.com/in/alexandraribeiro-pt"
  const instagramUrl = "https://www.instagram.com/alexandraribeiro.pt"
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false)
  const [isTermsConditionsOpen, setIsTermsConditionsOpen] = useState(false)
  const [newsletterName, setNewsletterName] = useState("")
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)

  const { lang } = useLanguage()

  const termsConditionsText = {
    en: "Terms and Conditions",
    pt: "Termos e Condições",
  }

  const language = dict.privacy === "Privacy Policy" ? "en" : "pt"

  const locationText = {
    en: "From Leiria, Portugal... to the world!",
    pt: "De Leiria, Portugal... para o mundo!",
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newsletterEmail || !isValidEmail(newsletterEmail)) {
      alert(dict.newsletterForm.emailValidationError || "Por favor, insira um email válido")
      return
    }

    setIsSubscribing(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail, name: newsletterName }),
      })

      if (response.ok) {
        setSubscribeSuccess(true)
        setNewsletterName("")
        setNewsletterEmail("")
        setTimeout(() => setSubscribeSuccess(false), 5000)
      } else {
        throw new Error("Failed to subscribe")
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error)
      alert(dict.newsletterForm.errorMessage || "Ocorreu um erro. Tente novamente.")
    } finally {
      setIsSubscribing(false)
    }
  }

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  return (
    <footer className="bg-primary text-white pt-20 pb-8 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 texture-dots opacity-10"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
      <div className="absolute top-10 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-accent/10 rounded-lg transform rotate-12"></div>

      <div className="container relative">
        {/* Newsletter subscription form section */}
        <div className="mb-16 bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
          <h3 className="text-white font-semibold text-2xl mb-4">Newsletter</h3>
          <p className="text-primary-foreground/80 mb-6">{dict.newsletterForm.description}</p>

          {subscribeSuccess ? (
            <div className="bg-accent/20 border border-accent text-white px-6 py-4 rounded-lg">
              {dict.newsletterForm.successMessage}
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
                <input
                  type="text"
                  placeholder={dict.newsletterForm.namePlaceholder}
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder={dict.newsletterForm.emailPlaceholder}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap md:w-auto w-full"
                >
                  {isSubscribing ? dict.newsletterForm.subscribing : "Quero receber as dicas!"}
                </Button>
              </div>
              <p className="text-primary-foreground/60 text-sm mt-3">{dict.newsletterForm.privacyText}</p>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-semibold text-xl mb-6 border-b border-white/10 pb-2">Alexandra Ribeiro</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Gestão Técnica de Operações Digitais para PME e Negócios Online em Portugal.
            </p>
            <div className="flex gap-4">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-accent transition-colors duration-300 bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-accent transition-colors duration-300 bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="text-white/70 hover:text-accent transition-colors duration-300 bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xl mb-6 border-b border-white/10 pb-2">Links</h3>
            <ul className="space-y-3">
              {dict.links.map((link: any, index: number) => (
                <li key={index}>
                  <Link
                    href={`/${lang}${link.url}`}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.text}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${lang}/portfolio`}
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xl mb-6 border-b border-white/10 pb-2">Contacto</h3>
            <div className="flex items-center gap-3 mb-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <Mail className="h-5 w-5 text-accent" />
              <a
                href={`mailto:${email}`}
                className="text-primary-foreground/90 hover:text-white transition-colors duration-300"
              >
                {email}
              </a>
            </div>
            <div className="flex items-center gap-3 mb-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground/90">{locationText[language as keyof typeof locationText]}</span>
            </div>
            <p className="text-primary-foreground/70 text-sm mt-6">
              Disponível de segunda a sexta-feira, das 9h30 às 18h (Portugal)
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
          <p className="text-primary-foreground/70">
            &copy; {new Date().getFullYear()} Alexandra Ribeiro. Todos os direitos reservados.
          </p>
          <div className="mt-2 flex justify-center space-x-4 flex-wrap">
            <button
              onClick={() => setIsPrivacyPolicyOpen(true)}
              className="text-primary-foreground/70 hover:text-accent transition-colors duration-300"
            >
              {dict.privacy}
            </button>
            <button
              onClick={() => setIsTermsConditionsOpen(true)}
              className="text-primary-foreground/70 hover:text-accent transition-colors duration-300"
            >
              {termsConditionsText[language as keyof typeof termsConditionsText]}
            </button>
            <a
              href="https://www.livroreclamacoes.pt/Inicio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-accent transition-colors duration-300 flex items-center"
            >
              {dict.complaintsBook} <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>

      <CookieConsent dict={dict.cookieConsent} />
      <PrivacyPolicyPopup
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
        title={dict.privacy}
        language={language}
      />
      <TermsConditionsPopup
        isOpen={isTermsConditionsOpen}
        onClose={() => setIsTermsConditionsOpen(false)}
        title={termsConditionsText[language as keyof typeof termsConditionsText]}
      />
    </footer>
  )
}
