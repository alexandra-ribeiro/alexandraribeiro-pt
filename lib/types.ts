export interface Dictionary {
  nav: {
    home: string
    about: string
    services: string
    portfolio: string
    blog: string
    contact: string
    store: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    cta: string
    secondaryCta: string
  }
  about: {
    title: string
    description: string
    experience: string
    clients: string
    projects: string
    satisfaction: string
  }
  services: {
    title: string
    description: string
  }
  footer: {
    description: string
    quickLinks: string
    services: string
    contact: string
    copyright: string
    newsletter: {
      title: string
      description: string
      placeholder: string
      subscribe: string
      success: string
      error: string
    }
  }
  common: {
    loading: string
    error: string
    retry: string
  }
}

export interface LanguageContextType {
  language: "pt" | "en"
  dictionary: Dictionary
  setLanguage: (lang: "pt" | "en") => void
}

export interface Product {
  id: string
  title: string
  description: string
  price: number | null
  imageUrl: string | null
  slug: string
  stripePaymentLink: string | null
  features: string | null
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  author: string
  tags: string[]
  featuredImage?: string
}
