import type { Locale } from "./types"

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale = "pt") => {
  try {
    // Ensure locale is valid
    const validLocale = locale === "en" ? "en" : "pt"
    return await dictionaries[validLocale]()
  } catch (error) {
    console.error("Error loading dictionary:", error)
    // Fallback to Portuguese dictionary
    try {
      return await dictionaries.pt()
    } catch (fallbackError) {
      console.error("Error loading fallback dictionary:", fallbackError)
      // Return minimal fallback object
      return {
        metadata: {
          title: "Alexandra Ribeiro | Consultora Digital",
          description: "Digital consulting services",
        },
        hero: {
          title: "Alexandra Ribeiro",
          subtitle: "Consultora Digital",
        },
        navigation: {
          home: "Início",
          about: "Sobre",
          services: "Serviços",
          portfolio: "Portfolio",
          blog: "Blog",
          contact: "Contacto",
        },
      }
    }
  }
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
