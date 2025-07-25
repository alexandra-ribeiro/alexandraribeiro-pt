"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Mail, Gift } from "lucide-react"

interface NewsletterPopupProps {
  dict: any
}

export default function NewsletterPopup({ dict }: NewsletterPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Show popup after 30 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("newsletter-popup-seen")
      if (!hasSeenPopup) {
        setIsVisible(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("newsletter-popup-seen", "true")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          handleClose()
        }, 2000)
      }
    } catch (error) {
      console.error("Error subscribing:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{dict?.title || "Oferta Especial!"}</h3>
              <p className="text-gray-600">
                {dict?.description ||
                  "Subscreva a nossa newsletter e receba um guia gratuito com 10 dicas essenciais para assistentes virtuais."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict?.placeholder || "O seu melhor email"}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "A subscrever..." : dict?.subscribe || "Subscrever Gratuitamente"}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Não enviamos spam. Pode cancelar a subscrição a qualquer momento.
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Obrigada!</h3>
            <p className="text-gray-600">
              Subscrição realizada com sucesso. Verifique o seu email para receber o guia gratuito.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
