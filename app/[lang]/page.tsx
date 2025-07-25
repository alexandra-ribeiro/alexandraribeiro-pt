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
    const dict = await getDictionary(params.lang as "pt" | "en")
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
  let dict

  try {
    dict = await getDictionary(params.lang as "pt" | "en")
  } catch (error) {
    console.error("Error loading dictionary:", error)
    // Fallback dictionary
    dict = {
      metadata: {
        title: "Alexandra Ribeiro | Consultora Digital",
        description: "Digital consulting services",
      },
      hero: {
        title: "Alexandra Ribeiro",
        subtitle: "Consultora Digital e Assistente Virtual Técnica",
        cta: "Saber Mais",
      },
      aboutMe: {
        title: "Sobre Mim",
        description: "Consultora digital especializada em assistência virtual técnica",
        experience: "Anos de experiência",
        skills: ["Consultoria Digital", "Assistência Virtual", "Gestão de Projetos"],
      },
      whatIsVA: {
        title: "O que é um Assistente Virtual?",
        description:
          "Um assistente virtual é um profissional que oferece serviços de apoio administrativo, técnico e criativo de forma remota.",
        benefits: ["Flexibilidade", "Eficiência", "Economia"],
      },
      whyChooseVA: {
        title: "Porquê Escolher um Assistente Virtual?",
        reasons: [
          {
            title: "Flexibilidade",
            description: "Trabalho adaptado às suas necessidades",
          },
        ],
      },
      certifications: {
        title: "Certificações",
        description: "Certificações profissionais",
        items: [],
      },
      blogPreview: {
        title: "Blog",
        description: "Artigos e dicas",
        readMore: "Ler mais",
      },
      finalCTA: {
        title: "Pronto para começar?",
        description: "Entre em contacto connosco",
        cta: "Contactar",
      },
      footer: {
        contact: {
          title: "Contacto",
          email: "info@alexandraribeiro.pt",
          phone: "+351 123 456 789",
        },
        social: {
          title: "Redes Sociais",
        },
        legal: {
          privacy: "Política de Privacidade",
          terms: "Termos e Condições",
        },
        copyright: "© 2024 Alexandra Ribeiro. Todos os direitos reservados.",
      },
      newsletterPopup: {
        title: "Newsletter",
        description: "Subscreva a nossa newsletter",
        placeholder: "O seu email",
        subscribe: "Subscrever",
        close: "Fechar",
      },
      navigation: {
        home: "Início",
        about: "Sobre",
        services: "Serviços",
        portfolio: "Portfolio",
        blog: "Blog",
        contact: "Contacto",
        store: "Loja",
      },
      store: {
        title: "Loja Digital",
        seoHeading: "Produtos e serviços digitais",
        noProductsFound: "Nenhum produto encontrado",
        buyButton: "Comprar",
      },
      product: {
        noImage: "Sem imagem disponível",
        buyNow: "Comprar agora",
      },
    }
  }

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
