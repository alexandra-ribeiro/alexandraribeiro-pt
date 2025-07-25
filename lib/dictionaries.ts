import "server-only"

export type Locale = "pt" | "en"

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale = "pt") => {
  try {
    const validLocale: Locale = locale === "en" ? "en" : "pt"
    const dict = await dictionaries[validLocale]()
    return dict
  } catch (error) {
    console.error("Error loading dictionary:", error)
    // Return minimal fallback structure
    return {
      metadata: {
        title: "Alexandra Ribeiro | Consultora Digital",
        description: "Digital consulting services",
      },
      navigation: [
        { label: "Início", path: "/" },
        { label: "Sobre", path: "/about" },
        { label: "Serviços", path: "/services" },
        { label: "Portfolio", path: "/portfolio" },
        { label: "Blog", path: "/blog" },
        { label: "Contacto", path: "/contact" },
      ],
      hero: {
        headline: "Alexandra Ribeiro",
        subheadline: "Consultora Digital e Assistente Virtual Técnica",
        cta: "Saber Mais",
      },
      aboutMe: {
        title: "Sobre Mim",
      },
      whatIsVA: {
        title: "O que é uma Assistente Virtual",
      },
      whyChooseVA: {
        title: "Porquê Escolher uma Assistente Virtual",
      },
      certifications: {
        title: "Certificações",
      },
      blogPreview: {
        title: "Blog",
      },
      finalCTA: {
        title: "Pronto para começar?",
      },
      footer: {
        links: [],
        contact: "info@alexandraribeiro.pt",
        privacy: "Política de Privacidade",
        terms: "Termos e Condições",
        complaintsBook: "Livro de Reclamações",
      },
      newsletterPopup: {
        title: "Newsletter",
      },
      headerCTA: "Contactar",
    }
  }
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
