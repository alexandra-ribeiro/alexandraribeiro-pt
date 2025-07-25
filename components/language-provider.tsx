"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { Dictionary, LanguageContextType } from "@/lib/types"

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const defaultDict: Dictionary = {
  metadata: {
    title: "Alexandra Ribeiro | Consultora Digital",
    description: "Digital consulting services",
  },
  hero: {
    title: "Alexandra Ribeiro",
    subtitle: "Consultora Digital e Assistente Virtual Técnica",
    cta: "Contactar",
  },
  aboutMe: {
    title: "Sobre Mim",
    description: "Consultora digital especializada em assistência virtual técnica",
    experience: "Anos de experiência",
    skills: ["Consultoria Digital", "Assistência Virtual", "Gestão de Projetos"],
  },
  whatIsVA: {
    title: "O que é um Assistente Virtual?",
    description:
      "Um assistente virtual é um profissional que oferece serviços de apoio administrativo, técnico e criativo de forma remota.",
    benefits: ["Flexibilidade", "Eficiência", "Economia"],
  },
  whyChooseVA: {
    title: "Porquê Escolher um Assistente Virtual?",
    reasons: [
      {
        title: "Flexibilidade",
        description: "Trabalho adaptado às suas necessidades",
      },
    ],
  },
  certifications: {
    title: "Certificações",
    description: "Certificações profissionais",
    items: [],
  },
  blogPreview: {
    title: "Blog",
    description: "Artigos e dicas",
    readMore: "Ler mais",
  },
  finalCTA: {
    title: "Pronto para começar?",
    description: "Entre em contacto connosco",
    cta: "Contactar",
  },
  footer: {
    contact: {
      title: "Contacto",
      email: "info@alexandraribeiro.pt",
      phone: "+351 123 456 789",
    },
    social: {
      title: "Redes Sociais",
    },
    legal: {
      privacy: "Política de Privacidade",
      terms: "Termos e Condições",
    },
    copyright: "© 2024 Alexandra Ribeiro. Todos os direitos reservados.",
  },
  newsletterPopup: {
    title: "Newsletter",
    description: "Subscreva a nossa newsletter",
    placeholder: "O seu email",
    subscribe: "Subscrever",
    close: "Fechar",
  },
  navigation: {
    home: "Início",
    about: "Sobre",
    services: "Serviços",
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contacto",
    store: "Loja",
  },
  store: {
    title: "Loja Digital",
    seoHeading: "Produtos e serviços digitais",
    noProductsFound: "Nenhum produto encontrado",
    buyButton: "Comprar",
  },
  product: {
    noImage: "Sem imagem disponível",
    buyNow: "Comprar agora",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [language, setLanguageState] = useState<"pt" | "en">("pt")
  const [dict, setDict] = useState<Dictionary>(defaultDict)

  useEffect(() => {
    const pathLang = pathname.split("/")[1]
    if (pathLang === "en" || pathLang === "pt") {
      setLanguageState(pathLang)
    }
  }, [pathname])

  const setLanguage = (lang: "pt" | "en") => {
    setLanguageState(lang)
    const currentPath = pathname.split("/").slice(2).join("/")
    router.push(`/${lang}/${currentPath}`)
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    dict,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
