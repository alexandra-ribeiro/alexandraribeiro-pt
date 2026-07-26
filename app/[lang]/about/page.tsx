import type { Metadata } from "next"
import Image from "next/image"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const lang = params.lang === "en" ? "en" : "pt"

  const baseUrl = "https://www.alexandraribeiro.pt"

  return {
    title: `${dict.about.title} | ${dict.metadata.title}`,
    description: dict.about.description,

    alternates: {
      canonical: `${baseUrl}/${lang}/about`,
      languages: {
        pt: `${baseUrl}/pt/about`,
        en: `${baseUrl}/en/about`,
        "x-default": `${baseUrl}/pt/about`,
      },
    },
  }
}

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)
  const isPortuguese = params.lang !== "en"

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader dict={dict} />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                {isPortuguese ? (
                  <>
                    Sou <span className="text-customGold">Alexandra Ribeiro</span> — a pessoa de IT que a sua
                    empresa não tem.
                  </>
                ) : (
                  <>
                    I'm <span className="text-customGold">Alexandra Ribeiro</span> — the IT person your company
                    doesn't have.
                  </>
                )}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl">
                {isPortuguese
                  ? "Engenheira informática com 20 anos de consultoria e desenvolvimento de software. Hoje trabalho como Diretora Técnica Externa para PME portuguesas na fase em que a operação já pede mais organização do que um Excel aguenta — a tradutora entre o negócio e a tecnologia."
                  : "Software engineer with 20 years in consulting and software development. Today I work as External Technical Director for Portuguese SMEs at the stage where their operations demand more structure than Excel can handle — the translator between business and technology."}
              </p>

              <div className="space-y-4 text-gray-700">
                <p>
                  {isPortuguese
                    ? "Provavelmente conhece a fase em que a sua empresa está: a faturação corre no Moloni ou equivalente, os documentos vivem no Drive, há um Trello algures — e, no meio disto tudo, o verdadeiro sistema de gestão são ficheiros Excel dispersos. Cada pessoa tem a sua folha, ninguém sabe o estado real dos projetos, e o dia passa-se a apagar fogos."
                    : "You probably know the stage your company is at: invoicing runs in your billing software, documents live in Drive, there's a Trello somewhere — and, in the middle of it all, the real management system is a set of scattered Excel files. Everyone has their own spreadsheet, nobody knows the real status of projects, and the day is spent putting out fires."}
                </p>

                <p>
                  {isPortuguese
                    ? "Quando uma empresa nesta fase procura ajuda, costuma receber uma de duas respostas: uma proposta de ERP com números de 5 dígitos e um ano de implementação, ou silêncio. Eu faço o meio-termo que falta: percebo primeiro como o negócio funciona, ligo as ferramentas que já existem e construo um sistema simples, à medida, por fases — com resultados visíveis desde as primeiras semanas."
                    : "When a company at this stage looks for help, it usually gets one of two answers: an ERP proposal with five-figure numbers and a year of implementation, or silence. I provide the missing middle ground: I first understand how the business works, connect the tools that already exist, and build a simple, custom system in phases — with visible results from the first weeks."}
                </p>

                <p>
                  {isPortuguese
                    ? "E faço mais uma coisa, que quase ninguém oferece: quando tem de falar com empresas de software, fico do seu lado da mesa. Traduzo as propostas, faço as perguntas difíceis e garanto que compra o que precisa — não o que lhe querem vender."
                    : "And I do one more thing that almost nobody offers: when you have to talk to software companies, I sit on your side of the table. I translate the proposals, ask the hard questions and make sure you buy what you need — not what they want to sell you."}
                </p>

                <p className="font-bold">
                  {isPortuguese
                    ? "É esse compromisso de independência — recomendar apenas o que serve o negócio, sem comissões de nenhum fornecedor — que sustenta tudo o resto do meu trabalho."
                    : "That commitment to independence — recommending only what serves the business, with no commissions from any vendor — is what underpins everything else I do."}
                </p>

                <div className="pt-2">
                  <Link href={`/${params.lang}/contact`}>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-[#CC9E00] hover:text-primary text-white"
                    >
                      {isPortuguese ? "Agendar chamada sem compromisso" : "Book a no-obligation call"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/about-hero-alexandra.jpg"
                  alt="Alexandra Ribeiro"
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-accent/20 rounded-full"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">{dict.about.story.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Timeline Image - Left Column */}
            <div className="relative">
              <div className="relative w-full h-auto">
                <Image
                  src="/images/a-minha-historia-profissional.png"
                  alt={isPortuguese ? "A minha história profissional - Timeline" : "My professional story - Timeline"}
                  width={500}
                  height={800}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* Story Text - Right Column */}
            <div className="space-y-4 text-gray-700">
              <p>
                {isPortuguese
                  ? "Passei 20 anos em engenharia informática, entre consultoria e desenvolvimento de software: implementação de sistemas empresariais, bases de dados, infraestrutura, segurança e projetos nacionais e internacionais."
                  : "I spent 20 years in software engineering, between consulting and software development: enterprise system implementations, databases, infrastructure, security, and national and international projects."}
              </p>

              <p>
                {isPortuguese
                  ? "Vi de perto os dois extremos. De um lado, projetos grandes que demoravam anos e chegavam ao fim já desajustados do negócio. Do outro, empresas pequenas a improvisar com folhas de cálculo porque ninguém lhes oferecia uma alternativa proporcional."
                  : "I saw both extremes up close. On one side, large projects that took years and were already out of step with the business by the time they were done. On the other, small companies improvising with spreadsheets because nobody offered them a proportionate alternative."}
              </p>

              <p>
                {isPortuguese
                  ? "Hoje uso essa experiência ao serviço desse meio-termo: sistemas construídos em low-code — ferramentas que permitem criar sem programar de raiz — sobre o que a empresa já usa, pelo método DPI: diagnosticar primeiro, priorizar depois, implementar por fases pequenas. E, porque um sistema sem manutenção morre em meses, fico depois da entrega: dúvidas, backups, segurança e evolução."
                  : "Today I put that experience at the service of that middle ground: systems built in low-code — tools that let you create without programming from scratch — on top of what the company already uses, following the DPI method: diagnose first, prioritise next, implement in small phases. And because a system without maintenance dies within months, I stay after delivery: questions, backups, security and evolution."}
              </p>

              <p>
                {isPortuguese
                  ? "O resultado típico da primeira fase? Um exemplo real: numa avaliação de proposta de ERP de 32.000€ para uma PME de 8 pessoas, o problema resolveu-se com o módulo do Moloni que a empresa já pagava sem usar, mais um painel de projetos construído em 6 semanas."
                  : "The typical result of the first phase? A real example: in evaluating a €32,000 ERP proposal for an 8-person SME, the problem was solved with a module of the invoicing software the company was already paying for without using, plus a project dashboard built in 6 weeks."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">{dict.about.values.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.about.values.items.map((value: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">{dict.about.tools.title}</h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>
                    {isPortuguese
                      ? "Low-code (construção à medida sem programar de raiz): Supabase, WeWeb, Make"
                      : "Low-code (custom building without programming from scratch): Supabase, WeWeb, Make"}
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>
                    {isPortuguese
                      ? "Faturação: Moloni, InvoiceXpress, Primavera (softwares portugueses, certificados pela AT)"
                      : "Invoicing: Moloni, InvoiceXpress, Primavera (Portuguese software, certified by the Tax Authority)"}
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>
                    {isPortuguese
                      ? "Automação e integrações: Make.com, n8n, Zapier"
                      : "Automation and integrations: Make.com, n8n, Zapier"}
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>
                    {isPortuguese
                      ? "Gestão e projetos: Monday, Notion, Trello, Atlassian Jira"
                      : "Management and projects: Monday, Notion, Trello, Atlassian Jira"}
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>
                    {isPortuguese
                      ? "Produtividade: Google Workspace, Microsoft 365"
                      : "Productivity: Google Workspace, Microsoft 365"}
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>
                    {isPortuguese
                      ? "Registo de tempos e medição: Toggl"
                      : "Time tracking and measurement: Toggl"}
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>{isPortuguese ? "Bases de Dados: SQL, Supabase" : "Databases: SQL, Supabase"}</span>
                </p>
                <p className="text-lg font-medium mt-2">{isPortuguese ? "… e mais!" : "… and more!"}</p>
              </div>
            </div>
            <div>
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/about-workspace-alexandra.jpg"
                  alt={isPortuguese ? "Ferramentas e software de trabalho" : "Workspace with tools and software"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              {isPortuguese ? "Para quem é este trabalho?" : "Who is this work for?"}
            </h2>
            <p className="text-gray-700">
              {isPortuguese
                ? "Trabalho com PME portuguesas com modelo de negócio validado, clientes reais e faturação estável — cuja maturidade já ultrapassou a fase de decisões avulsas e ferramentas soltas."
                : "I work with Portuguese SMEs with a validated business model, real clients and stable revenue — whose maturity has outgrown the stage of one-off decisions and disconnected tools."}
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <li className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="font-medium text-primary">
                {isPortuguese ? "PME que vivem em Excel" : "SMEs living in Excel"}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {isPortuguese
                  ? "Já usam Moloni, Drive e outras ferramentas — mas nada fala com nada, e a informação vive em folhas dispersas."
                  : "Already using invoicing software, Drive and other tools — but nothing talks to anything, and information lives in scattered spreadsheets."}
              </p>
            </li>

            <li className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="font-medium text-primary">
                {isPortuguese ? "Empresas com uma proposta de software na mesa" : "Companies with a software proposal on the table"}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {isPortuguese
                  ? "Receberam uma proposta de ERP ou de software e precisam de alguém do seu lado a traduzir antes de assinar."
                  : "They've received an ERP or software proposal and need someone on their side translating it before signing."}
              </p>
            </li>

            <li className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="font-medium text-primary">
                {isPortuguese ? "Equipas em salto de crescimento" : "Teams in a growth spurt"}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {isPortuguese
                  ? "Ganharam clientes, contrataram pessoas — e os processos informais rebentaram pelas costuras."
                  : "They've won clients, hired people — and the informal processes have burst at the seams."}
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{dict.about.cta.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{dict.about.cta.description}</p>
          <Link href={`/${params.lang}/contact`}>
            <Button
              size="lg"
              className="bg-customGold text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {dict.about.cta.button}
            </Button>
          </Link>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  )
}
