"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Award, Users, Clock, TrendingUp } from "lucide-react"

interface AboutMeProps {
  dict: any
  lang: string
}

export default function AboutMe({ dict, lang }: AboutMeProps) {
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

    const element = document.getElementById("about-me")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const stats = [
    {
      icon: Clock,
      value: "5+",
      label: lang === "en" ? "Years Experience" : "Anos de Experiência",
    },
    {
      icon: Users,
      value: "50+",
      label: lang === "en" ? "Happy Clients" : "Clientes Satisfeitos",
    },
    {
      icon: Award,
      value: "200+",
      label: lang === "en" ? "Projects Completed" : "Projetos Concluídos",
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: lang === "en" ? "Success Rate" : "Taxa de Sucesso",
    },
  ]

  return (
    <section id="about-me" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/alexandra-photo.jpeg"
                    alt="Alexandra Ribeiro"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-sm text-purple-100">
                      {lang === "en" ? "Years Experience" : "Anos de Experiência"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {dict?.title || (lang === "en" ? "About Me" : "Sobre Mim")}
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  {dict?.description ||
                    (lang === "en"
                      ? "I'm Alexandra Ribeiro, a digital consultant and technical virtual assistant with over 5 years of experience helping entrepreneurs and businesses optimize their online presence and streamline their operations."
                      : "Sou a Alexandra Ribeiro, consultora digital e assistente virtual técnica com mais de 5 anos de experiência a ajudar empreendedores e empresas a otimizar a sua presença online e simplificar as suas operações.")}
                </p>
                <p>
                  {lang === "en"
                    ? "My expertise spans across digital marketing, e-commerce setup, content management, and business process automation. I'm passionate about helping small businesses leverage technology to achieve their goals more efficiently."
                    : "A minha especialidade abrange marketing digital, configuração de e-commerce, gestão de conteúdos e automação de processos empresariais. Tenho paixão por ajudar pequenas empresas a aproveitar a tecnologia para alcançar os seus objetivos de forma mais eficiente."}
                </p>
                <p>
                  {lang === "en"
                    ? "When I'm not working on client projects, I enjoy staying up-to-date with the latest digital trends and sharing my knowledge through blog posts and workshops."
                    : "Quando não estou a trabalhar em projetos de clientes, gosto de me manter atualizada com as últimas tendências digitais e partilhar o meu conhecimento através de artigos de blog e workshops."}
                </p>
              </div>

              {/* Skills */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {lang === "en" ? "Core Skills" : "Competências Principais"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "WordPress",
                    "E-commerce",
                    "Social Media",
                    "Content Management",
                    "SEO",
                    "Email Marketing",
                    "Process Automation",
                    "Digital Strategy",
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
