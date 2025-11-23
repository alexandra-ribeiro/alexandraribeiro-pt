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
  const services = [
    {
      title: isPortuguese ? "START" : "START",
      subtitle: isPortuguese ? "Consultoria Técnica Estratégica" : "Strategic Technical Consulting",
      description: isPortuguese
        ? "Sessão 1:1 (60 min) + relatório personalizado"
        : "1:1 Session (60 min) + personalized report",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      intro: isPortuguese
        ? "Para empreendedores que precisam de orientação técnica, validação das suas escolhas, ajuda na configuração das ferramentas, ou apoio na estrutura inicial do projeto."
        : "For entrepreneurs who need technical guidance, validation of their choices, help with tool configuration, or support in the initial project structure.",
      perfectFor: isPortuguese
        ? [
            "começar um site ou loja online",
            "escolher ferramentas sem gastar tempo",
            "resolver bloqueios técnicos",
            "criar um plano claro de próximos passos",
            "análise e diagnóstico do que tens hoje",
          ]
        : [
            "start a website or online store",
            "choose tools without wasting time",
            "solve technical blocks",
            "create a clear plan for next steps",
            "analysis and diagnosis of what you have today",
          ],
      includes: isPortuguese
        ? [
            "Sessão remota 1:1",
            "Relatório com recomendações práticas",
            "Checklists, guias ou mini-tutoriais (quando aplicável)",
            "Entrega do relatório em 48h após a sessão",
          ]
        : [
            "Remote 1:1 session",
            "Report with practical recommendations",
            "Checklists, guides or mini-tutorials (when applicable)",
            "Report delivery within 48h after the session",
          ],
      pricing: isPortuguese
        ? "Valor: 65€\n\nPacote Start + (3 sessões de 1h para a execução das ferramentas escolhidas com o meu apoio e esclarecimento de dúvidas técnicas após início da utilização): 180€"
        : "Price: 65€\n\nStart + Package (3 1h sessions for tool execution with my support and technical clarification after start of use): 180€",
      buttonText: isPortuguese ? "Quero a minha consultoria" : "I want my consultation",
    },
    {
      title: isPortuguese ? "SUPPORT" : "SUPPORT",
      subtitle: isPortuguese ? "Assistência Digital Mensal (10h)" : "Monthly Digital Assistance (10h)",
      description: isPortuguese
        ? "O apoio técnico e operacional, sempre que precisa."
        : "Your technical and operational support, whenever you need it.",
      icon: <Calendar className="h-8 w-8 text-primary" />,
      intro: isPortuguese
        ? "Ideal para quem está a lançar projetos, gerir um site, criar produtos ou organizar o negócio, mas não quer lidar com detalhes técnicos, manutenção, problemas ou tarefas que consomem tempo."
        : "Ideal for those launching projects, managing a site, creating products or organizing the business, but don't want to deal with technical details, maintenance, problems or time-consuming tasks.",
      perfectFor: isPortuguese
        ? ["freelancers", "empreendedores em início de expansão", "criadores de conteúdo", "pequenos negócios digitais"]
        : [
            "freelancers",
            "entrepreneurs at the beginning of expansion",
            "content creators",
            "small digital businesses",
          ],
      includes: isPortuguese
        ? [
            "Gestão leve de operações",
            "Suporte técnico básico (WordPress, Shopify, Shopkit)",
            "Criação e atualização de páginas de produto",
            "Geração de imagens para websites com ajuda de IA",
            "Integrações simples (e-mail, formulários, automações leves)",
            "Organização de conteúdos, documentos e sistemas",
            "Preparação de checklists, SOPs e templates",
            "Apoio contínuo via e-mail",
          ]
        : [
            "Light operations management",
            "Basic technical support (WordPress, Shopify, Shopkit)",
            "Creation and update of product pages",
            "Image generation for websites with AI help",
            "Simple integrations (email, forms, light automations)",
            "Organization of content, documents and systems",
            "Preparation of checklists, SOPs and templates",
            "Continuous support via email",
          ],
      pricing: isPortuguese
        ? "Pack Mensal (10h): 220€\n\n(Este é o plano mais escolhido pelos meus clientes.)"
        : "Monthly Pack (10h): 220€\n\n(This is the most chosen plan by my clients.)",
      buttonText: isPortuguese ? "Quero o meu pack de 10h" : "I want my 10h pack",
    },
    {
      title: isPortuguese ? "GROWTH" : "GROWTH",
      subtitle: isPortuguese ? "Suporte Técnico + Expansão Digital" : "Technical Support + Digital Expansion",
      description: isPortuguese
        ? "Para quem já tem uma base sólida mas precisa de mais horas, mais acompanhamento e tarefas técnicas mais profundas."
        : "For those who already have a solid foundation but need more hours, more monitoring and deeper technical tasks.",
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      intro: isPortuguese
        ? "Inclui tudo do nível 'Support', mas com foco em crescimento, melhorias e evoluções."
        : "Includes everything from the 'Support' level, but with a focus on growth, improvements and evolutions.",
      perfectFor: isPortuguese
        ? [
            "lançamento de cursos em Systeme.io",
            "melhorias em sites existentes",
            "criação de landing pages",
            "automatizações mais avançadas",
            "projetos com várias entregas semanais",
          ]
        : [
            "course launch on Systeme.io",
            "improvements to existing sites",
            "creation of landing pages",
            "more advanced automations",
            "projects with multiple weekly deliveries",
          ],
      pricing: isPortuguese
        ? "Opções de Pack Growth:\n15h / mês → 320€\n20h / mês → 420€\n\nTrabalho Técnico Avulso:\n35€/h (para tarefas específicas sem necessidade de pack)"
        : "Growth Pack Options:\n15h / month → 320€\n20h / month → 420€\n\nAd-hoc Technical Work:\n35€/h (for specific tasks without the need for a pack)",
      buttonText: isPortuguese ? "Quero o plano Growth" : "I want the Growth plan",
    },
    {
      title: isPortuguese ? "PRO" : "PRO",
      subtitle: isPortuguese ? "Implementação de Projetos Técnicos" : "Technical Project Implementation",
      description: isPortuguese
        ? "Para negócios que precisam de criação, não apenas manutenção."
        : "For businesses that need creation, not just maintenance.",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      intro: isPortuguese ? "Exemplos de serviços Pro:" : "Examples of Pro services:",
      features: isPortuguese
        ? [
            "Criação de websites WordPress",
            "Configuração de software de facturação (Moloni ou InvoiceXpress) e integração SAF-T automática com a AT",
            "Configuração completa de lojas Shopify ou Shopkit",
            "Implementação de integrações e automações avançadas",
            "Configuração de domínio + e-mail profissional",
          ]
        : [
            "Creation of WordPress websites",
            "Configuration of invoicing software (Moloni or InvoiceXpress) and automatic SAF-T integration with AT",
            "Complete configuration of Shopify or Shopkit stores",
            "Implementation of advanced integrations and automations",
            "Domain configuration + professional email",
          ],
      pricing: isPortuguese
        ? "Pack Pro mensal (30h): 600€\n\n(Apenas 1 vaga por mês para projetos estruturais.)"
        : "Pro monthly pack (30h): 600€\n\n(Only 1 spot per month for structural projects.)",
      buttonText: isPortuguese
        ? "Quero trabalhar contigo"
        : "I want to work with you",
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
            {services.map((pkg, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="p-6 bg-gray-50">
                  <div className="flex items-center justify-center mb-4">{pkg.icon}</div>
                  <h3 className="text-xl font-bold text-center text-gray-900">{pkg.title}</h3>
                  <p className="text-lg font-medium text-center text-primary mt-1">{pkg.subtitle}</p>
                  <p className="text-sm text-center text-gray-600 mt-2">{pkg.description}</p>
                </div>
                <div className="p-6 flex-grow">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700">{pkg.intro}</p>

                    {pkg.perfectFor && pkg.perfectFor.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                          {isPortuguese ? "Perfeito para:" : "Perfect for:"}
                        </h4>
                        <ul className="space-y-2">
                          {pkg.perfectFor.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.includes && pkg.includes.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                          {isPortuguese ? "Inclui:" : "Includes:"}
                        </h4>
                        <ul className="space-y-2">
                          {pkg.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.features && pkg.features.length > 0 && (
                      <div>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.pricing && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-700 whitespace-pre-line font-medium">{pkg.pricing}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link href={`/${params.lang}/contact`}>
                    <Button className="w-full bg-primary hover:bg-primary/90">{pkg.buttonText}</Button>
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
                    ? "Templates e Ferramentas para o seu Negócio"
                    : "Templates and Tools for Your Business"}
                </p>
                <p className="text-gray-600">
                  {isPortuguese
                    ? "Checklists, SOPs, templates para Notion, planners e recursos para empreendedores que querem organização, clareza e automação."
                    : "Checklists, SOPs, Notion templates, planners and resources for entrepreneurs who want organization, clarity and automation for your business."}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
  href={isPortuguese 
    ? "https://store.alexandraribeiro.pt/pt/store"
    : "https://store.alexandraribeiro.pt/en/store"
  }
  target="_blank"
  rel="noopener noreferrer"
>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
                    {isPortuguese ? "Ver a loja digital" : "View digital store"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              {isPortuguese ? "O que está incluído em todos os planos" : "What's Included in All Plans"}
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              {isPortuguese ? "Independentemente do plano, tem sempre:" : "Regardless of the plan, you always have:"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isPortuguese ? "Acompanhamento dedicado" : "Dedicated support"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isPortuguese ? "Via WhatsApp e e-mail" : "Via WhatsApp and email"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isPortuguese ? "Gestão simples" : "Simple management"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isPortuguese ? "De tarefas e prioridades" : "Of tasks and priorities"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isPortuguese ? "Entrega flexível" : "Flexible delivery"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isPortuguese ? "Semanal ou diária (conforme o plano)" : "Weekly or daily (according to plan)"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isPortuguese ? "Revisões incluídas" : "Revisions included"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isPortuguese ? "Sem custos adicionais" : "No additional costs"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <Lock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isPortuguese ? "Confidencialidade total" : "Total confidentiality"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isPortuguese ? "Proteção dos teus dados" : "Protection of your data"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isPortuguese ? "Relatório transparente" : "Transparent reporting"}
                </h3>
                <p className="text-sm text-gray-600">{isPortuguese ? "De horas atualizado" : "Of updated hours"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-[#002642]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white">
              {isPortuguese ? "Como funciona trabalhar comigo" : "How Working with Me Works"}
            </h2>
            <p className="text-lg text-white/80">
              {isPortuguese
                ? "Um processo simples, transparente e flexível para garantir que recebe exatamente o suporte de que precisa."
                : "A simple, transparent and flexible process to ensure you receive exactly the support you need."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-customGold rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <div className="flex-grow bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isPortuguese
                    ? "Escolhe o plano que melhor se adapta ao seu momento"
                    : "Choose the plan that best suits your moment"}
                </h3>
                <p className="text-white/80">
                  {isPortuguese
                    ? "Start para começar · Support para estabilidade · Growth para escalar · Pro para delegar tudo."
                    : "Start to begin · Support for stability · Growth to scale · Pro to delegate everything."}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-customGold rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <div className="flex-grow bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isPortuguese
                    ? "Agendamos uma pequena reunião de alinhamento."
                    : "We schedule a small alignment meeting."}
                </h3>
                <p className="text-white/80">
                  {isPortuguese
                    ? "Alinhamos prioridades, ferramentas e expectativas."
                    : "We align priorities, tools and expectations."}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-customGold rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <div className="flex-grow bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isPortuguese ? "Acesso ao meu sistema de gestão" : "Access to my management system"}
                </h3>
                <p className="text-white/80">
                  {isPortuguese
                    ? "Terá acesso ao seu espaço dedicado para tarefas, horas e entregas."
                    : "You have access to your dedicated space for tasks, hours and deliveries."}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-customGold rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <div className="flex-grow bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isPortuguese ? "Trabalhamos de forma fluida e organizada" : "We work in a fluid and organized way"}
                </h3>
                <p className="text-white/80">
                  {isPortuguese
                    ? "Comunicação clara, tarefas priorizadas e entregas semanais ou diárias."
                    : "Clear communication, prioritized tasks and weekly or daily deliveries."}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-customGold rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">5</span>
              </div>
              <div className="flex-grow bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isPortuguese ? "Próximos passos mensais" : "Monthly next steps"}
                </h3>
                <p className="text-white/80">
                  {isPortuguese
                    ? "No final de cada mês, revemos objetivos e optimizamos o plano conforme o seu crescimento."
                    : "At the end of each month, we review goals and optimize the plan according to your growth."}
                </p>
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
