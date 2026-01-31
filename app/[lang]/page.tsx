export const dynamic = "force-dynamic"
import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"

import SiteHeader from "@/components/site-header"
import HeroSection from "@/components/hero-section"
import PainPointsSection from "@/components/pain-points-section"
import WhatIsVA from "@/components/what-is-va"
import WhyChooseVA from "@/components/why-choose-va"
import AboutMe from "@/components/about-me"
import CertificationsSection from "@/components/certifications-section"
import ContentfulBlogPreview from "@/components/contentful-blog-preview"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"
import NewsletterPopup from "@/components/newsletter-popup"
import EnhancedDivider from "@/components/enhanced-divider"


export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang === "en" ? "en" : "pt"

  const baseUrl = "https://www.alexandraribeiro.pt"

  const titles = {
    pt: "Alexandra Ribeiro | Gestão Técnica de Operações Digitais para PME em Portugal",
    en: "Alexandra Ribeiro | Digital Tech Operations Management for SME in Portugal",
  }

  const descriptions = {
    pt: "Gestão Técnica de Operações Digitais para PM, empreendedores e negócios online em Portugal.",
    en: "Digital Tech Operations Management for SME, entrepreneurs and online businesses in Portugal.",
  }

  return {
    title: titles[lang],
    description: descriptions[lang],

    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        pt: `${baseUrl}/pt`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/pt`,
      },
    },
  }
}

export default async function Home({
  params,
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <main className="min-h-screen">
      <SiteHeader dict={dict} />
      <HeroSection dict={dict.hero} />

      <PainPointsSection dict={dict.painPoints} />

      <AboutMe dict={dict.aboutMe} lang={params.lang} />

      <EnhancedDivider />

      <WhatIsVA dict={dict.whatIsVA} />

      <div className="section-divider my-8"></div>

      <WhyChooseVA dict={dict.whyChooseVA} />
      <CertificationsSection dict={dict.certifications} />

      <ContentfulBlogPreview
        dict={dict.blogPreview}
        lang={params.lang}
      />

      <FinalCTA dict={dict.finalCTA} />
      <Footer dict={dict.footer} />
      <NewsletterPopup dict={dict.newsletterPopup} />
    </main>
  )
}
