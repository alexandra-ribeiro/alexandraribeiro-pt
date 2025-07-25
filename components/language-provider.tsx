"use client"

import type React from "react"
import { createContext, useContext } from "react"
import type { Dictionary, LanguageContextType } from "@/lib/types"

const LanguageContext = createContext<LanguageContextType>({ lang: "pt" })

const defaultDict: Dictionary = {
  metadata: {
    title: "Alexandra Ribeiro | Digital Consultant",
    description: "Digital consulting services",
  },
  hero: {
    title: "Alexandra Ribeiro",
    subtitle: "Digital Consultant and Technical Virtual Assistant",
    cta: "Contact",
  },
  aboutMe: {
    title: "About Me",
    description: "Specialized digital consultant in technical virtual assistance",
    experience: "Years of experience",
    skills: ["Digital Consulting", "Technical Virtual Assistance", "Project Management"],
  },
  whatIsVA: {
    title: "What is a Virtual Assistant?",
    description:
      "A virtual assistant is a professional who offers administrative, technical, and creative support services remotely.",
    benefits: ["Flexibility", "Efficiency", "Cost Savings"],
  },
  whyChooseVA: {
    title: "Why Choose a Virtual Assistant?",
    reasons: [
      {
        title: "Flexibility",
        description: "Work adapted to your needs",
      },
    ],
  },
  certifications: {
    title: "Certifications",
    description: "Professional certifications",
    items: [],
  },
  blogPreview: {
    title: "Blog",
    description: "Articles and tips",
    readMore: "Read more",
  },
  finalCTA: {
    title: "Ready to start?",
    description: "Contact us",
    cta: "Contact",
  },
  footer: {
    contact: {
      title: "Contact",
      email: "info@alexandraribeiro.pt",
      phone: "+351 123 456 789",
    },
    social: {
      title: "Social Media",
    },
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
    },
    copyright: "© 2024 Alexandra Ribeiro. All rights reserved.",
  },
  newsletterPopup: {
    title: "Newsletter",
    description: "Subscribe to our newsletter",
    placeholder: "Your email",
    subscribe: "Subscribe",
    close: "Close",
  },
  navigation: {
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contact",
    store: "Store",
  },
  store: {
    title: "Digital Store",
    seoHeading: "Digital products and services",
    noProductsFound: "No products found",
    buyButton: "Buy",
  },
  product: {
    noImage: "No image available",
    buyNow: "Buy now",
  },
}

interface LanguageProviderProps {
  children: React.ReactNode
  lang?: string
}

export function LanguageProvider({ children, lang = "pt" }: LanguageProviderProps) {
  return <LanguageContext.Provider value={{ lang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context || { lang: "pt" }
}
