export type Locale = "pt" | "en"

export interface NavigationItem {
  label: string
  path: string
}

export interface Dictionary {
  metadata: {
    title: string
    description: string
  }
  navigation: NavigationItem[]
  hero: {
    headline: string
    subheadline: string
    cta: string
  }
  aboutMe: {
    title: string
  }
  whatIsVA: {
    title: string
  }
  whyChooseVA: {
    title: string
  }
  certifications: {
    title: string
  }
  blogPreview: {
    title: string
  }
  finalCTA: {
    title: string
  }
  footer: {
    links: NavigationItem[]
    contact: string
    privacy: string
    terms: string
    complaintsBook: string
  }
  newsletterPopup: {
    title: string
  }
  headerCTA: string
}
