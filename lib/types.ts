export type Locale = "pt" | "en"

export interface NavigationItem {
  label: string
  path: string
}

export interface HeroDict {
  headline: string
  subheadline: string
  cta: string
}

export interface AboutMeDict {
  title: string
  description?: string
}

export interface WhatIsVADict {
  title: string
  description?: string
}

export interface WhyChooseVADict {
  title: string
  description?: string
}

export interface CertificationsDict {
  title: string
  description?: string
}

export interface BlogPreviewDict {
  title: string
  description?: string
}

export interface FinalCTADict {
  title: string
  description?: string
  cta?: string
}

export interface FooterDict {
  links: NavigationItem[]
  contact: string
  privacy: string
  terms: string
  complaintsBook: string
}

export interface NewsletterPopupDict {
  title: string
  description?: string
}

export interface MetadataDict {
  title: string
  description: string
}

export interface Dictionary {
  metadata: MetadataDict
  navigation: NavigationItem[]
  hero: HeroDict
  aboutMe: AboutMeDict
  whatIsVA: WhatIsVADict
  whyChooseVA: WhyChooseVADict
  certifications: CertificationsDict
  blogPreview: BlogPreviewDict
  finalCTA: FinalCTADict
  footer: FooterDict
  newsletterPopup: NewsletterPopupDict
  headerCTA: string
}
