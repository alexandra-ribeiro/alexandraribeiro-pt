import type { Dictionary } from "@/lib/types"

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
}

const fallbackDict: Dictionary = {
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

export async function getDictionary(locale: "pt" | "en"): Promise<Dictionary> {
  try {
    const dict = await dictionaries[locale]()
    return dict as Dictionary
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error)
    return fallbackDict
  }
}
