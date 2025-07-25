export type Locale = "pt" | "en"

export interface Dictionary {
  metadata: {
    title: string
    description: string
  }
  hero: {
    headline: string
    subheadline: string
    cta: string
  }
  navigation: Array<{
    label: string
    path: string
  }>
  headerCTA: string
  footer: {
    links: Array<{
      text: string
      url: string
    }>
    contact: string
    privacy: string
    terms: string
    complaintsBook: string
  }
  aboutMe: any
  whatIsVA: any
  whyChooseVA: any
  certifications: any
  blogPreview: any
  finalCTA: any
  newsletterPopup: any
}
