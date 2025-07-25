"use client"

import { useState, useEffect } from "react"
import { Shield, Zap, Heart, Award, Clock, Users } from "lucide-react"

interface WhyChooseVAProps {
  dict: any
}

export default function WhyChooseVA({ dict }: WhyChooseVAProps) {
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

    const element = document.getElementById("why-choose-va")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const reasons = [
    {
      icon: Shield,
      title: "Confiabilidade",
      description: "Profissional certificada com histórico comprovado de sucesso e confidencialidade.",
    },
    {
      icon: Zap,
      title: "Eficiência",
      description: "Processos otimizados e ferramentas modernas para máxima produtividade.",
    },
    {
      icon: Heart,
      title: "Dedicação",
      description: "Comprometimento total com o sucesso do seu projeto e objetivos de negócio.",
    },
    {
      icon: Award,
      title: "Qualidade",
      description: "Padrões elevados de qualidade em todos os serviços prestados.",
    },
    {
      icon: Clock,
      title: "Pontualidade",
      description: "Cumprimento rigoroso de prazos e disponibilidade quando precisar.",
    },
    {
      icon: Users,
      title: "Suporte",
      description: "Acompanhamento contínuo e suporte técnico especializado.",
    },
  ]

  return (
    <section id="why-choose-va" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {dict?.title || "Porquê Escolher um Assistente Virtual?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra as vantagens de trabalhar com uma assistente virtual especializada em soluções digitais para o
              seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>

          <div
            className={`mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 lg:p-12 text-white transition-all duration-1000 delay-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Pronta para Transformar o Seu Negócio?</h3>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Junte-se a mais de 50 empreendedores que já transformaram os seus negócios com assistência virtual
                especializada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/pt/contact"
                  className="inline-flex items-center px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  Contactar Agora
                </a>
                <a
                  href="/pt/services"
                  className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-colors duration-300"
                >
                  Ver Serviços
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
