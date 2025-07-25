import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import HeroSection from "@/components/hero-section"
import WhatIsVA from "@/components/what-is-va"
import WhyChooseVA from "@/components/why-choose-va"
import AboutMe from "@/components/about-me"
import CertificationsSection from "@/components/certifications-section"
import ContentfulBlogPreview from "@/components/contentful-blog-preview"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"
import NewsletterPopup from "@/components/newsletter-popup"
import EnhancedDivider from "@/components/enhanced-divider"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  try {
    const dict = await getDictionary(params.lang)
    return {
      title: dict.metadata?.title || "Alexandra Ribeiro | Consultora Digital",
      description: dict.metadata?.description || "Digital consulting services",
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Alexandra Ribeiro | Consultora Digital",
      description: "Digital consulting services",
    }
  }
}

export default async function Home({ params }: { params: { lang: string } }) {
  try {
    const dict = await getDictionary(params.lang)

    return (
      <main className="min-h-screen">
        <SiteHeader dict={dict} />
        <HeroSection dict={dict.hero} />
        <AboutMe dict={dict.aboutMe} lang={params.lang} />

        <EnhancedDivider />

        <WhatIsVA dict={dict.whatIsVA} />

        {/* Barra separadora */}
        <div className="section-divider my-8"></div>

        <WhyChooseVA dict={dict.whyChooseVA} />
        <CertificationsSection dict={dict.certifications} />
        {/* Testimonials section temporarily hidden */}
        {/* <Testimonials dict={dict.testimonials} /> */}
        <ContentfulBlogPreview dict={dict.blogPreview} lang={params.lang} />
        <FinalCTA dict={dict.finalCTA} />
        <Footer dict={dict.footer} />
        <NewsletterPopup dict={dict.newsletterPopup} />
      </main>
    )
  } catch (error) {
    console.error("Error rendering page:", error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Alexandra Ribeiro</h1>
          <p className="text-gray-600">Consultora Digital e Assistente Virtual Técnica</p>
        </div>
      </div>
    )
  }
}
