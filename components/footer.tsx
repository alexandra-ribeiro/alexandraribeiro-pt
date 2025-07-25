"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { useLanguage } from "./language-provider"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle")
  const { language, dictionary } = useLanguage()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubscriptionStatus("success")
        setEmail("")
      } else {
        setSubscriptionStatus("error")
      }
    } catch (error) {
      setSubscriptionStatus("error")
    } finally {
      setIsSubscribing(false)
      setTimeout(() => setSubscriptionStatus("idle"), 3000)
    }
  }

  const quickLinks = [
    { href: `/${language}`, label: dictionary.nav.home },
    { href: `/${language}/about`, label: dictionary.nav.about },
    { href: `/${language}/services`, label: dictionary.nav.services },
    { href: `/${language}/portfolio`, label: dictionary.nav.portfolio },
  ]

  const serviceLinks = [
    { href: `/${language}/services`, label: "Virtual Assistant" },
    { href: `/${language}/services`, label: "Content Creation" },
    { href: `/${language}/services`, label: "Social Media" },
    { href: `/${language}/services`, label: "E-commerce" },
  ]

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href={`/${language}`} className="inline-block mb-6">
              <Image
                src={language === "pt" ? "/images/logo-pt.png" : "/images/logo-en.png"}
                alt="Alexandra Ribeiro - Virtual Assistant"
                width={180}
                height={60}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">{dictionary.footer.description}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{dictionary.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${language}/blog`}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {dictionary.nav.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${language}/store`}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {dictionary.nav.store}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{dictionary.footer.services}</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{dictionary.footer.contact}</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-purple-400 flex-shrink-0" />
                <a
                  href="mailto:info@alexandraribeiro.pt"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  info@alexandraribeiro.pt
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-purple-400 flex-shrink-0" />
                <a href="tel:+351123456789" className="text-gray-300 hover:text-white transition-colors duration-300">
                  +351 123 456 789
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">Lisboa, Portugal</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={18} className="text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">09:00 - 18:00</span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-3">{dictionary.footer.newsletter.title}</h4>
              <p className="text-gray-300 text-sm mb-4">{dictionary.footer.newsletter.description}</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dictionary.footer.newsletter.placeholder}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors duration-300"
                >
                  {isSubscribing ? dictionary.common.loading : dictionary.footer.newsletter.subscribe}
                </button>
              </form>
              {subscriptionStatus === "success" && (
                <p className="text-green-400 text-sm mt-2">{dictionary.footer.newsletter.success}</p>
              )}
              {subscriptionStatus === "error" && (
                <p className="text-red-400 text-sm mt-2">{dictionary.footer.newsletter.error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2024 Alexandra Ribeiro. {dictionary.footer.copyright}</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
