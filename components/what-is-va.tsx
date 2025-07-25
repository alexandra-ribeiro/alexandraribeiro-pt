"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Users, Clock, TrendingUp } from "lucide-react"

interface WhatIsVAProps {
  dict: any
}

export default function WhatIsVA({ dict }: WhatIsVAProps) {
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

    const element = document.getElementById("what-is-va")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const benefits = [
    {
      icon: Clock,
      title: "Flexibilidade",
      description: "Trabalho remoto com horários flexíveis adaptados às suas necessidades.",
    },
    {
      icon: TrendingUp,
      title: "Eficiência",
      description: "Otimização de processos e aumento da produtividade do seu negócio.",
    },
    {
      icon: Users,
      title: "Economia",
      description: "Redução de custos operacionais sem comprometer a qualidade do serviço.",
    },
  ]

  return (
    <section id="what-is-va" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {dict?.title || "O que é um Assistente Virtual?"}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {dict?.description ||
                "Um assistente virtual é um profissional que oferece serviços de apoio administrativo, técnico e criativo de forma remota."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div
            className={`mt-12 bg-white rounded-lg p-8 shadow-lg transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Principais Vantagens</h3>
                <ul className="space-y-3">
                  {[
                    "Redução de custos operacionais",
                    "Acesso a especialistas qualificados",
                    "Flexibilidade de horários",
                    "Foco no core business",
                    "Escalabilidade do negócio",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
                  <h4 className="text-3xl font-bold mb-2">5+</h4>
                  <p className="text-blue-100">Anos de Experiência</p>
                  <div className="mt-4">
                    <h4 className="text-3xl font-bold mb-2">50+</h4>
                    <p className="text-blue-100">Clientes Satisfeitos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
