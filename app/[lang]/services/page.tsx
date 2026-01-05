import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  Check,
  Calendar,
  ShoppingCart,
  Sparkles,
  MessageCircle,
  CalendarIcon,
  FileText,
  Lock,
  Clock,
  Lightbulb,
} from "lucide-react"
import FAQSection from "@/components/faq-section"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const lang = params.lang === "en" ? "en" : "pt"

  const baseUrl = "https://www.alexandraribeiro.pt"

  return {
    title: `${dict.servicesPage.title} | ${dict.metadata.title}`,
    description: dict.servicesPage.description,

    alternates: {
      canonical: `${baseUrl}/${lang}/services`,
      languages: {
        pt: `${baseUrl}/pt/services`,
        en: `${baseUrl}/en/services`,
        "x-default": `${baseUrl}/pt/services`,
      },
    },
  }
}

export default async function ServicesPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)
  const isPortuguese = params.lang === "pt"

  

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader dict={dict} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-primary">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{dict.servicesPage.hero.title}</h1>
              <p className="text-xl mb-8 text-primary/90">{dict.servicesPage.hero.subtitle}</p>
              <Link href={`/${params.lang}/contact`}>
                <Button size="lg" className="bg-customGold hover:bg-primary text-primary hover:text-white">
                  {isPortuguese ? "Falar sobre o meu negócio" : "Talk about my business"}
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                  src="/images/3photo.jpg"
                  alt="Virtual Assistant Services"
                  width={800}
                  height={400}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Service Packages Section */}
      <section className="py-16 md:py-24 bg-[#002642]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">{dict.servicesPage.categories.title}</h2>
          <div className="max-w-4xl mx-auto space-y-12">

            {[
              {
                title: "Diagnóstico Técnico & Estratégia Digital",
                desc: "Quando sente que algo não está bem, mas não sabe exatamente o quê.",
                items: [
                  "Análise da estrutura técnica atual do negócio",
                  "Identificação de falhas, riscos e ineficiências",
                  "Recomendações claras, práticas e priorizadas",
                ],
              },
              {
                title: "Suporte Técnico Contínuo",
                desc: "Para negócios que precisam de apoio técnico recorrente.",
                items: [
                  "Manutenção e ajustes em websites e lojas online",
                  "Gestão de email profissional",
                  "Resolução de problemas técnicos do dia a dia",
                ],
              },
              {
                title: "Automação & Integração de Sistemas",
                desc: "Para quem perde demasiado tempo com tarefas repetitivas.",
                items: [
                  "Automação de emails e comunicações",
                  "Integrações entre ferramentas existentes",
                  "Redução de trabalho manual e erros",
                ],
              },
              {
                title: "Email Marketing & Processos Recorrentes",
                desc: "Para negócios com relação contínua com clientes.",
                items: [
                  "Criação de newsletters e fluxos automáticos",
                  "Alertas e notificações recorrentes",
                  "Comunicação consistente e profissional",
                ],
              },
              {
                title: "Implementação Técnica de Sistemas",
                desc: "Para quem está a começar ou precisa de reorganizar a base.",
                items: [
                  "Website ou loja online",
                  "Email profissional e faturação",
                  "Configuração simples e escalável",
                ],
              },
           ].map((service, i) => (
  <div
    key={i}
    className={`bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-3xl
      ${i % 2 !== 0 ? "md:ml-auto" : ""}`}
  >
    <h3 className="text-xl font-semibold text-primary mb-3">
      {service.title}
    </h3>

    <p className="text-gray-600 mb-4">
      {service.desc}
    </p>

    <ul className="list-disc list-inside text-gray-600 space-y-2">
      {service.items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
))}

          </div>
          </div>
        </section>

      

      {/* Differentiators Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-primary">{dict.servicesPage.differentiators.title}</h2>
            <p className="text-lg text-gray-700">{dict.servicesPage.differentiators.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dict.servicesPage.differentiators.items.map((item: any, index: number) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{dict.servicesPage.cta.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{dict.servicesPage.cta.description}</p>
          <Link href={`/${params.lang}/contact`}>
            <Button size="lg" className="bg-customGold hover:bg-primary text-primary hover:text-white">
              {isPortuguese ? "Agendar chamada" : "Schedule a call"}
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection dict={dict.servicesPage.faq} />

      <Footer dict={dict.footer} />
    </main>
  )
}
