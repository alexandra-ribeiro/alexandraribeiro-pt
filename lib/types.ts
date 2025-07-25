export interface Dictionary {
  metadata: {
    title: string
    description: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
    headline?: string
    subheadline?: string
  }
  aboutMe: {
    title: string
    description: string
    experience: string
    skills: string[]
  }
  whatIsVA: {
    title: string
    description: string
    benefits: string[]
  }
  whyChooseVA: {
    title: string
    reasons: Array<{
      title: string
      description: string
    }>
  }
  certifications: {
    title: string
    description: string
    items: any[]
  }
  blogPreview: {
    title: string
    description: string
    readMore: string
  }
  finalCTA: {
    title: string
    description: string
    cta: string
  }
  footer: {
    contact: {
      title: string
      email: string
      phone: string
    }
    social: {
      title: string
    }
    legal: {
      privacy: string
      terms: string
    }
    copyright: string
  }
  newsletterPopup: {
    title: string
    description: string
    placeholder: string
    subscribe: string
    close: string
  }
  navigation: {
    home: string
    about: string
    services: string
    portfolio: string
    blog: string
    contact: string
    store: string
  }
  store: {
    title: string
    seoHeading: string
    noProductsFound: string
    buyButton: string
  }
  product: {
    noImage: string
    buyNow: string
  }
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

export interface Product {
  id: string
  title: string
  description: string
  price: number
  image?: string
  slug: string
  category?: string
}
