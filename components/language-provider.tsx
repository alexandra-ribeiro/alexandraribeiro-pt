"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import type { Dictionary, LanguageContextType } from "@/lib/types"

const defaultDictionary: Dictionary = {
  nav: {
    home: "Início",
    about: "Sobre",
    services: "Serviços",
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contacto",
    store: "Loja",
  },
  hero: {
    title: "Alexandra Ribeiro",
    subtitle: "Assistente Virtual Técnica",
    description:
      "Especializada em consultoria digital e assistência virtual técnica para empreendedores e empresas online.",
    cta: "Contactar Agora",
    secondaryCta: "Saber Mais",
  },
  about: {
    title: "Sobre Mim",
    description: "Consultora digital com mais de 5 anos de experiência.",
    experience: "Anos de Experiência",
    clients: "Clientes Satisfeitos",
    projects: "Projetos Concluídos",
    satisfaction: "Taxa de Satisfação",
  },
  services: {
    title: "Serviços",
    description: "Soluções completas para o seu negócio digital.",
  },
  footer: {
    description:
      "Consultora digital especializada em assistência virtual técnica e otimização de processos empresariais.",
    quickLinks: "Links Rápidos",
    services: "Serviços",
    contact: "Contacto",
    copyright: "Todos os direitos reservados.",
    newsletter: {
      title: "Newsletter",
      description: "Receba dicas e novidades sobre marketing digital.",
      placeholder: "O seu email",
      subscribe: "Subscrever",
      success: "Subscrito com sucesso!",
      error: "Erro ao subscrever. Tente novamente.",
    },
  },
  common: {
    loading: "A carregar...",
    error: "Erro",
    retry: "Tentar novamente",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  dictionary: defaultDictionary,
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const [dictionary, setDictionary] = useState<Dictionary>(defaultDictionary)

  useEffect(() => {
    const lang = pathname.startsWith("/en") ? "en" : "pt"
    setLanguage(lang)

    // Load dictionary based on language
    if (lang === "en") {
      setDictionary({
        nav: {
          home: "Home",
          about: "About",
          services: "Services",
          portfolio: "Portfolio",
          blog: "Blog",
          contact: "Contact",
          store: "Store",
        },
        hero: {
          title: "Alexandra Ribeiro",
          subtitle: "Technical Virtual Assistant",
          description:
            "Specialized in digital consulting and technical virtual assistance for entrepreneurs and online businesses.",
          cta: "Contact Now",
          secondaryCta: "Learn More",
        },
        about: {
          title: "About Me",
          description: "Digital consultant with over 5 years of experience.",
          experience: "Years of Experience",
          clients: "Satisfied Clients",
          projects: "Completed Projects",
          satisfaction: "Satisfaction Rate",
        },
        services: {
          title: "Services",
          description: "Complete solutions for your digital business.",
        },
        footer: {
          description:
            "Digital consultant specialized in technical virtual assistance and business process optimization.",
          quickLinks: "Quick Links",
          services: "Services",
          contact: "Contact",
          copyright: "All rights reserved.",
          newsletter: {
            title: "Newsletter",
            description: "Get tips and news about digital marketing.",
            placeholder: "Your email",
            subscribe: "Subscribe",
            success: "Successfully subscribed!",
            error: "Error subscribing. Please try again.",
          },
        },
        common: {
          loading: "Loading...",
          error: "Error",
          retry: "Try again",
        },
      })
    } else {
      setDictionary(defaultDictionary)
    }
  }, [pathname])

  return <LanguageContext.Provider value={{ language, dictionary, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
