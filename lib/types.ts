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
    lang?: string
  }
  aboutMe: any
  whatIsVA: any
  whyChooseVA: any
  certifications: any
  blogPreview: any
  finalCTA: any
  footer: any
  newsletterPopup: any
  headerCTA: string
}
