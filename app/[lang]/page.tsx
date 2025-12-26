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


export default async function Home({ params }: { params: { lang: string } }) {
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
}
