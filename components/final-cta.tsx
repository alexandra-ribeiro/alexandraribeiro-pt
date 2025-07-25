"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, MessageCircle, Calendar, Star } from "lucide-react"

interface FinalCTAProps {
  dict: any
}

export default function FinalCTA({ dict }: FinalCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("final-cta")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="final-cta" className="py-16 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current mx-1" />
              ))}
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {dict?.title || "Pronta para Transformar o Seu Negócio?"}
            </h2>

            <p className="text-xl lg:text-2xl text-purple-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              {dict?.description ||
                "Junte-se a mais de 50 empreendedores que já transformaram os seus negócios com assistência virtual especializada. Vamos começar hoje mesmo!"}
            </p>

            {/* Stats */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-purple-200">Clientes Satisfeitos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">200+</div>
                <div className="text-purple-200">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-purple-200">Taxa de Satisfação</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href="/pt/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {dict?.cta || "Contactar Agora"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/pt/services"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Ver Serviços
              </Link>
            </div>

            {/* Trust Indicators */}
            <div
              className={`mt-12 transition-all duration-1000 delay-900 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-purple-200 text-sm mb-4">Resposta garantida em 24 horas</p>
              <div className="flex justify-center items-center space-x-8 opacity-70">
                <div className="text-white text-sm">✓ Consulta Gratuita</div>
                <div className="text-white text-sm">✓ Sem Compromisso</div>
                <div className="text-white text-sm">✓ Confidencialidade Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
