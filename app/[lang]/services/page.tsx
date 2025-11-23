import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Check, Rocket, Calendar, ShoppingCart, Sparkles } from "lucide-react"
import FAQSection from "@/components/faq-section"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.servicesPage.title} | ${dict.metadata.title}`,
    description: dict.servicesPage.description,
  }
}

export default async function ServicesPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)
  const isPortuguese = params.lang === "pt"

  // Service packages data
  const packages = [
    {
      title: isPortuguese ? "STARTER" : "STARTER",
      subtitle: isPortuguese ? "Arranque Digital Sem Stress" : "Stress-Free Digital Launch",
      description: isPortuguese ? "Ideal para quem está a começar do zero" : "Ideal for those starting from scratch",
      icon: <Rocket className="h-8 w-8 text-primary" />,
      features: isPortuguese
        ? [
            "Consultoria inicial de 90 minutos para diagnóstico de necessidades",
            "Aconselhamento sobre ferramentas",
            "Checklist personalizada, com recomendação personalizada de stack tecnológico + mini-roadmap digital",
            "Apoio na aquisição de domínio e email profissional",
            "Apoio na configuração de clientes de email (em computador e mobile)",
            "Seleção e configuração de software de faturação adequado",
            "Setup básico de CRM e sistema de email marketing",
            "Ambiente Google com pastas partilhadas",
            "Implementação inicial de 1 ferramenta de produtividade (Notion/ClickUp/Trello)",
          ]
        : [
            "Initial 90-minute consultation for needs assessment",
            "Tools and software recommendations",
            "Personalized checklist with technology stack recommendation + mini digital roadmap",
            "Support in domain acquisition and professional email setup",
            "Support in email client configuration (desktop and mobile)",
            "Selection and configuration of appropriate invoicing software",
            "Basic CRM and email marketing system setup",
            "Google environment with shared folders",
            "Initial implementation of 1 productivity tool (Notion/ClickUp/Trello)",
          ],
    },
    {
      title: isPortuguese ? "MENSAL" : "MONTHLY",
      subtitle: isPortuguese ? "Manutenção e Apoio Contínuo" : "Continuous Maintenance and Support",
      description: isPortuguese
        ? "Para gestão contínua da presença digital"
        : "For continuous management of digital presence",
      icon: <Calendar className="h-8 w-8 text-primary" />,
      features: isPortuguese
        ? [
            "Suporte AV técnico e administrativo",
            "Atualização de conteúdos / manutenção de loja online",
            "Pequenas automações, integrações e melhorias técnicas",
            "Apoio na criação de conteúdos com IA",
            "Gestão de CRM e email marketing",
          ]
        : [
            "Technical and administrative VA support",
            "Content updates / online store maintenance",
            "Small automations, integrations and technical improvements",
            "Support in creating content with AI",
            "CRM and email marketing management",
          ],
    },
    {
      title: isPortuguese ? "E-COMMERCE" : "E-COMMERCE",
      subtitle: isPortuguese ? "Acelerador de Lançamento de Loja Online" : "Online Store Launch Accelerator",
      description: isPortuguese
        ? "Especializado para quem quer iniciar a sua loja online"
        : "Specialized for those who want to start their online store",
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      features: isPortuguese
        ? [
            "Setup de loja Shopify (ou Etsy)",
            "Criação dos primeiros produtos na loja",
            "Apoio em integrações: pagamentos, envios, newsletter",
            "Configuração de email marketing para recuperação de carrinhos",
            "Integração com sistemas de faturação portugueses",
          ]
        : [
            "Shopify (or Etsy) store setup",
            "Creation of the first products in the store",
            "Support with integrations: payments, shipping, newsletter",
            "Email marketing configuration for cart recovery",
            "Integration with Portuguese invoicing systems",
          ],
    },
    {
      title: isPortuguese ? "IA NO NEGÓCIO" : "AI FOR BUSINESS",
      subtitle: isPortuguese ? "IA Descomplicada para Empreendedores" : "Simplified AI for Entrepreneurs",
      description: isPortuguese
        ? "Transforma a inteligência artificial numa aliada prática para o teu dia a dia de empreendedor"
        : "Transform artificial intelligence into a practical ally for your day-to-day entrepreneurial life",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      features: isPortuguese
        ? [
            "Criação de Custom GPTs adaptados ao teu negócio (para responder a clientes, gerar conteúdo com a tua linguagem, sugerir ideias, etc.)",
            "Criação de websites rápidos e profissionais com ferramentas de no-code baseadas em IA (como V0.dev)",
            "Apoio na criação de imagens com IA (para redes sociais, blog, produtos digitais ou e-commerce)",
            "Formação leve e prática para que saibas usar a IA com confiança no teu dia a dia",
            "Recomendações de ferramentas de IA acessíveis (gratuitas ou low-cost) adaptadas ao teu perfil",
            "Este serviço pode ser contratado como extra em qualquer outro pack ou isoladamente, com apoio 1:1",
          ]
        : [
            "Creation of Custom GPTs tailored to your business (to respond to customers, generate content in your language, suggest ideas, etc.)",
            "Creation of fast and professional websites with AI-based no-code tools (like V0.dev)",
            "Support in creating images with AI (for social media, blog, digital products or e-commerce)",
            "Light and practical training so you can use AI with confidence in your daily life",
            "Recommendations of accessible AI tools (free or low-cost) adapted to your profile",
            "This service can be contracted as an extra in any other package or separately, with 1:1 support",
          ],
    },
  ]

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
                  {isPortuguese ? "Agendar chamada" : "Schedule a call"}
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
          <p className="text-lg text-center text-white/80 mb-16 max-w-3xl mx-auto">
            {isPortuguese
              ? "Escolha o pacote que melhor se adapta às necessidades do seu negócio"
              : "Choose the package that best suits your business needs"}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="p-6 bg-gray-50">
                  <div className="flex items-center justify-center mb-4">{pkg.icon}</div>
                  <h3 className="text-xl font-bold text-center text-gray-900">{pkg.title}</h3>
                  <p className="text-lg font-medium text-center text-primary mt-1">{pkg.subtitle}</p>
                  <p className="text-sm text-center text-gray-600 mt-2">{pkg.description}</p>
                </div>
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <Link href={`/${params.lang}/contact`}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {isPortuguese ? "Saber mais" : "Learn more"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Digital Products Card */}
          <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8 p-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {isPortuguese ? "Produtos Digitais" : "Digital Products"}
                </h3>
                <p className="text-lg font-medium text-gray-700 mb-3">
                  {isPortuguese
                    ? "Templates e Ferramentas para o teu Negócio"
                    : "Templates and Tools for Your Business"}
                </p>
                <p className="text-gray-600">
                  {isPortuguese
                    ? "Checklists, SOPs, templates para Notion, planners e recursos para empreendedoras que querem organização, clareza e automação do teu negócio."
                    : "Checklists, SOPs, Notion templates, planners and resources for entrepreneurs who want organization, clarity and automation for your business."}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link href="https://alexandraribeiro.gumroad.com/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
                    {isPortuguese ? "Ver a loja digital" : "View digital store"}
                  </Button>
                </Link>
              </div>
            </div>
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
