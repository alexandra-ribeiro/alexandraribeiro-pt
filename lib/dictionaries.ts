import type { Dictionary } from "./types"

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  try {
    const dict = await dictionaries[locale as keyof typeof dictionaries]?.()
    if (!dict) {
      throw new Error(`Dictionary not found for locale: ${locale}`)
    }
    return dict as Dictionary
  } catch (error) {
    console.error(`Error loading dictionary for ${locale}:`, error)

    // Fallback dictionary
    return {
      metadata: {
        title: "Alexandra Ribeiro | Consultora Digital",
        description:
          "Consultora Digital e Assistente Virtual Técnica especializada em implementação de sistemas e identidade profissional online.",
      },
      navigation: [
        { label: locale === "en" ? "Home" : "Início", path: "/" },
        { label: locale === "en" ? "About" : "Sobre", path: "/about" },
        { label: locale === "en" ? "Services" : "Serviços", path: "/services" },
        { label: "Portfolio", path: "/portfolio" },
        { label: "Blog", path: "/blog" },
        { label: locale === "en" ? "Contact" : "Contacto", path: "/contact" },
      ],
      hero: {
        headline: "Alexandra Ribeiro",
        subheadline:
          locale === "en"
            ? "Digital Consultant & Technical Virtual Assistant"
            : "Consultora Digital e Assistente Virtual Técnica",
        cta: locale === "en" ? "Learn More" : "Saber Mais",
      },
      aboutMe: {
        title: locale === "en" ? "About Me" : "Sobre Mim",
      },
      whatIsVA: {
        title: locale === "en" ? "What is a Virtual Assistant?" : "O que é uma Assistente Virtual?",
      },
      whyChooseVA: {
        title: locale === "en" ? "Why Choose a Virtual Assistant?" : "Porquê Escolher uma Assistente Virtual?",
      },
      certifications: {
        title: locale === "en" ? "Certifications" : "Certificações",
      },
      blogPreview: {
        title: "Blog",
      },
      finalCTA: {
        title: locale === "en" ? "Ready to Get Started?" : "Pronto para Começar?",
      },
      footer: {
        links: [],
        contact: locale === "en" ? "Contact" : "Contacto",
        privacy: locale === "en" ? "Privacy Policy" : "Política de Privacidade",
        terms: locale === "en" ? "Terms & Conditions" : "Termos e Condições",
        complaintsBook: locale === "en" ? "Complaints Book" : "Livro de Reclamações",
      },
      newsletterPopup: {
        title: "Newsletter",
      },
      headerCTA: locale === "en" ? "Contact" : "Contactar",
    } as Dictionary
  }
}
