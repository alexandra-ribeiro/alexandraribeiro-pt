import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
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
  const isPortuguese = params.lang !== "en"

  const serviceBlocks = isPortuguese
    ? [
        {
          title: "Diagnóstico — o mapa antes da obra",
          desc: "O primeiro passo de qualquer projeto: uma a duas semanas a perceber como a empresa trabalha de facto — não como está escrito que trabalha. Como numa obra em casa, ninguém pinta as paredes antes de resolver a canalização.",
          items: [
            "Mapa da operação: o que existe, o que falta, o que está a desperdiçar tempo e dinheiro",
            "Custo do caos: horas semanais perdidas em tarefas manuais e retrabalho, multiplicadas pelo valor/hora — o custo mensal, em euros, de continuar assim",
            "Limpeza de entulho digital: subscrições esquecidas e ferramentas pagas sem uso — uma vitória rápida que frequentemente paga o próprio diagnóstico",
          ],
        },
        {
          title: "Intermediação técnica com fornecedores",
          desc: "Recebeu uma proposta de ERP ou de software e o fornecedor diz que «é tudo muito simples»? Antes de assinar, deixe-me ler isso consigo.",
          items: [
            "Tradução de propostas e contratos de software para linguagem de negócio",
            "As perguntas difíceis feitas ao fornecedor por quem fala a mesma língua técnica",
            "Acompanhamento da entrega: o que foi prometido é o que é entregue",
          ],
        },
        {
          title: "Sistemas à medida em low-code",
          desc: "Low-code — ferramentas que permitem construir sistemas sem programar de raiz (Supabase, WeWeb, Make) — sobre as ferramentas que a equipa já usa, sem obrigar a mudar tudo.",
          items: [
            "Cockpit de gestão: um painel onde vê o estado de cada projeto, quem está a fazer o quê e quanto tempo custa cada trabalho",
            "Automações e integrações entre as ferramentas existentes (Moloni, Google Workspace, Drive)",
            "Implementação por fases pequenas, com a primeira melhoria visível em poucas semanas — nunca projetos «big bang» de 18 meses",
          ],
        },
        {
          title: "Manter & Proteger",
          desc: "Os sistemas nas PME morrem sobretudo por falta de manutenção, muito mais do que por má implementação. Um sistema sem dono volta ao Excel em três meses.",
          items: [
            "Gestão do dia a dia: criação de contas de email profissional e acessos para novos colaboradores, atualização de conteúdos no site institucional e manutenção da loja online — tudo o que a operação precisa, sem ter uma equipa de IT interna para tratar disso",
            "Acompanhamento contínuo: dúvidas da equipa, atualizações, ajustes e evolução do sistema à medida que o negócio muda",
            "Backups reais e auditoria de acessos — as chaves mestras ficam sempre em nome da empresa, sem portas abertas para ex-colaboradores",
            "Plano de recuperação escrito: se o site for invadido ou uma conta bloqueada, o negócio volta a funcionar em horas, não em semanas",
          ],
        },
        {
          title: "Sessão de Consultoria Digital",
          desc: "Para independentes e negócios em arranque que ainda não precisam de um sistema completo — um serviço pontual, com preço fechado.",
          items: [
            "Sessão online única para analisar a situação atual",
            "Relatório com próximos passos e ferramentas aconselhadas",
            "Sem retainer nem compromisso de continuidade",
          ],
        },
      ]
    : [
        {
          title: "Diagnosis — the map before the build",
          desc: "The first step of any project: one to two weeks understanding how the company actually works — not how it's written down that it works. Like renovating a house, nobody paints the walls before fixing the plumbing.",
          items: [
            "Operation map: what exists, what's missing, what's wasting time and money",
            "Cost of chaos: weekly hours lost to manual tasks and rework, multiplied by hourly value — the monthly cost, in euros, of keeping things as they are",
            "Digital clutter cleanup: forgotten subscriptions and paid-but-unused tools — a quick win that often pays for the diagnosis itself",
          ],
        },
        {
          title: "Technical intermediation with vendors",
          desc: "Received an ERP or software proposal, and the vendor says \"it's all very simple\"? Before signing, let me read it with you.",
          items: [
            "Translation of software proposals and contracts into business language",
            "The hard questions asked of the vendor by someone who speaks the same technical language",
            "Delivery oversight: what was promised is what gets delivered",
          ],
        },
        {
          title: "Custom systems in low-code",
          desc: "Low-code — tools that let you build systems without programming from scratch (Supabase, WeWeb, Make) — on top of the tools the team already uses, without forcing you to change everything.",
          items: [
            "Management dashboard: one screen showing the status of every project, who's doing what and how much time each job costs",
            "Automations and integrations between existing tools (invoicing software, Google Workspace, Drive)",
            "Implementation in small phases, with the first improvement visible within a few weeks — never \"big bang\" 18-month projects",
          ],
        },
        {
          title: "Maintain & Protect",
          desc: "Systems in SMEs die mostly from lack of maintenance, far more than from poor implementation. A system without an owner goes back to Excel within three months.",
          items: [
            "Day-to-day management: setting up professional email accounts and access for new hires, updating content on the company website, and maintaining the online store — everything the operation needs, without an in-house IT team to handle it",
            "Ongoing support: team questions, updates, adjustments and system evolution as the business changes",
            "Real backups and access audits — the master keys always stay in the company's name, with no doors left open for former staff",
            "Written recovery plan: if the website is hacked or an account is blocked, the business is back up in hours, not weeks",
          ],
        },
        {
          title: "Digital Consulting Session",
          desc: "For independents and early-stage businesses that don't yet need a full system — a one-off service at a fixed price.",
          items: [
            "Single online session to review the current situation",
            "Report with next steps and recommended tools",
            "No retainer and no ongoing commitment",
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
                  {dict.servicesPage.hero.cta}
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                  src="/images/3photo.jpg"
                  alt={isPortuguese ? "Sistemas operacionais digitais para PME" : "Digital operating systems for SMEs"}
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

      {/* Service Blocks Section */}
      <section className="py-16 md:py-24 bg-[#002642]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">{dict.servicesPage.categories.title}</h2>
          <div className="max-w-4xl mx-auto space-y-12">
            {serviceBlocks.map((service, i) => (
              <div
                key={i}
                className={`bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-3xl
                  ${i % 2 !== 0 ? "md:ml-auto" : ""}`}
              >
                <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>

                <p className="text-gray-600 mb-4">{service.desc}</p>

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

          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mt-12">
            {dict.servicesPage.differentiators.description}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{dict.servicesPage.cta.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{dict.servicesPage.cta.description}</p>
          <Link href={`/${params.lang}/contact`}>
            <Button size="lg" className="bg-customGold hover:bg-primary text-primary hover:text-white">
              {dict.servicesPage.cta.button}
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
