"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Award } from "lucide-react"

interface CertificationsSectionProps {
  dict: any
}

export default function CertificationsSection({ dict }: CertificationsSectionProps) {
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

    const element = document.getElementById("certifications")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const certifications = [
    {
      name: "Microsoft Certified",
      image: "/images/certifications/microsoft-certified-logo.png",
      alt: "Microsoft Certification",
      description: "Microsoft Office Specialist",
    },
    {
      name: "Canva Certified",
      image: "/images/certifications/canva-certified.png",
      alt: "Canva Certification",
      description: "Canva Design Certified",
    },
    {
      name: "Shopify Partners",
      image: "/images/certifications/shopify-partners-logo.png",
      alt: "Shopify Partners",
      description: "Shopify Partner Program",
    },
    {
      name: "eRank Certified",
      image: "/images/certifications/erank-logo.png",
      alt: "eRank Certification",
      description: "Etsy SEO Specialist",
    },
    {
      name: "Instituto Superior Técnico",
      image: "/images/certifications/tecnico-lisboa-logo.png",
      alt: "Técnico Lisboa",
      description: "Engineering Background",
    },
    {
      name: "LDS Certified",
      image: "/images/certifications/lds-logo.png",
      alt: "LDS Certification",
      description: "Digital Marketing",
    },
  ]

  return (
    <section id="certifications" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {dict?.title || "Certificações e Qualificações"}
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {dict?.description ||
                "Certificações profissionais que garantem a qualidade e especialização dos serviços prestados."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 64px, 64px"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{cert.name}</h3>
                  <p className="text-xs text-gray-600">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-12 text-center transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Formação Contínua</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Mantenho-me sempre atualizada com as últimas tendências e tecnologias através de formação contínua e
                certificações profissionais.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Digital Marketing
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">E-commerce</span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  SEO & Analytics
                </span>
                <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                  Social Media
                </span>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  Content Creation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
