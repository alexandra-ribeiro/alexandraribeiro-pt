import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import FAQSection from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import {
  FileQuestion,
  AlertTriangle,
  GitCompare,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react"

const BASE_URL = "https://www.alexandraribeiro.pt"
const PAGE_PATH = "/pt/services/revisao-propostas-erp-crm"

const PAGE_TITLE = "Revisão de propostas de ERP e CRM | Antes de Assinar | Alexandra Ribeiro"
const PAGE_DESCRIPTION =
  "Revisão independente de propostas de ERP, CRM e software de gestão para PME. Custo real a 3 anos, perguntas ao fornecedor e relatório em 5 dias úteis."

const faqItems = [
  {
    question: "Quanto custa a revisão?",
    answer:
      "Tem preço fechado, conhecido antes de começar. O valor depende da modalidade (uma proposta ou comparação de propostas) e é indicado na chamada inicial de 15 minutos.",
  },
  {
    question: "Quanto tempo demora?",
    answer: "5 dias úteis a contar da receção de todos os documentos. Há uma opção urgente em 3 dias úteis.",
  },
  {
    question: "E se a proposta estiver boa?",
    answer: "O relatório diz isso mesmo, com as razões. Assinar com confiança também é um bom resultado.",
  },
  {
    question: "Fala diretamente com o fornecedor?",
    answer:
      "O serviço base entrega as perguntas e os pontos a negociar. Se a empresa quiser, posso estar presente nas reuniões com o fornecedor, contratadas à parte.",
  },
  {
    question: "O software da minha empresa é industrial. Pode ajudar?",
    answer:
      "Software técnico, como CAD, BIM ou controlo de produção, fica fora deste serviço. Num ERP com módulo de produção, analiso as partes comercial, financeira, contratual e de integrações, e digo claramente o que ficou por avaliar.",
  },
  {
    question: "Revê o contrato do ponto de vista legal?",
    answer:
      "Não. Assinalo as cláusulas que pesam no negócio, como fidelização, condições de saída e propriedade dos dados. A validação jurídica é de um advogado.",
  },
  {
    question: "A informação da proposta fica confidencial?",
    answer:
      "Sim. Os documentos são usados apenas para a análise, e posso assinar um acordo de confidencialidade se a empresa o pedir.",
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (lang === "en") {
    return { robots: { index: false, follow: false } }
  }

  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`
  const imageUrl = `${BASE_URL}/images/services-hero-alexandra.jpg`

  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        pt: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },

    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Alexandra Ribeiro — Antes de Assinar",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      images: [imageUrl],
    },
  }
}

export default async function BeforeSigningPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (lang === "en") {
    notFound()
  }

  const dict = await getDictionary(lang)
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Antes de Assinar: revisão de propostas de ERP e CRM",
    description: PAGE_DESCRIPTION,
    provider: {
      "@type": "Person",
      name: "Alexandra Ribeiro",
      url: `${BASE_URL}/pt/about`,
    },
    areaServed: "Portugal",
    url: canonicalUrl,
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader dict={dict} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl text-primary">
            <span className="text-accent text-sm uppercase tracking-widest font-medium mb-3 block">
              Antes de Assinar
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Revisão independente de propostas de ERP e CRM
            </h1>
            <p className="text-xl mb-8 text-primary/90">
              Antes de assinar uma proposta de ERP, CRM ou software de gestão, leio-a consigo: o que está incluído,
              o que fica de fora, quanto vai custar ao terceiro ano e que perguntas fazer ao fornecedor. Relatório
              escrito em 5 dias úteis, com preço fechado.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Preço fechado", "Relatório em 5 dias úteis", "Sem comissões de fornecedores"].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center px-4 py-2 text-sm rounded-full border border-border/30 text-primary bg-gray-50"
                >
                  {chip}
                </span>
              ))}
            </div>
            <Link href="/pt/contact">
              <Button size="lg" className="bg-customGold hover:bg-primary text-primary hover:text-white">
                Agendar chamada sem compromisso
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reconhece alguma destas situações? */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
            Reconhece alguma destas situações?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: FileQuestion,
                title: "«Recebemos uma proposta de ERP e não sabemos se faz sentido.»",
                description: "São 40 páginas, metade em termos técnicos, e um prazo de validade a correr.",
              },
              {
                icon: AlertTriangle,
                title: "«O fornecedor diz que está tudo incluído.»",
                description:
                  "Falta saber se «tudo» inclui a passagem dos dados antigos, a formação da equipa e os utilizadores que vão entrar no próximo ano.",
              },
              {
                icon: GitCompare,
                title: "«Temos três propostas e nenhuma se compara com as outras.»",
                description: "Cada fornecedor apresenta módulos, preços e prazos à sua maneira.",
              },
              {
                icon: TrendingUp,
                title: "«A renovação do CRM chegou com um aumento.»",
                description: "Antes de aceitar, convém saber o que mudou e o que se pode negociar.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-background border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <card.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que fica a saber antes de assinar */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-4 text-center text-primary">
            O que fica a saber antes de assinar
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            A análise segue sempre os mesmos pontos, escritos na linguagem de quem gere o negócio.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "O que está incluído e o que fica de fora",
                description:
                  "Módulos, número de utilizadores, integrações, passagem dos dados antigos e formação. Tudo o que aparece como «à parte» ou «a orçamentar» fica identificado.",
              },
              {
                title: "Quanto custa ao terceiro ano",
                description:
                  "Licenças por utilizador, aumentos anuais previstos, manutenção e horas extra. Há propostas que parecem baratas a 12 meses e deixam de o ser a 36.",
              },
              {
                title: "Se resolve o problema da empresa",
                description:
                  "Se as funcionalidades propostas respondem ao que a operação precisa, ou se há módulos a mais e falhas onde importa.",
              },
              {
                title: "O que o contrato diz sobre o futuro",
                description:
                  "Fidelização, condições de saída, a quem pertencem os dados e em que formato se exportam, suporte e tempos de resposta.",
              },
              {
                title: "Quanto tempo vai exigir à equipa",
                description:
                  "Configuração, testes e formação. É um custo que nunca aparece na proposta, porque não é o fornecedor que o paga.",
              },
              {
                title: "Se existe um caminho mais simples",
                description: "Incluindo usar melhor o que a empresa já paga. Às vezes, a melhor recomendação é não comprar.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Como funciona</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Envio da proposta",
                description:
                  "A proposta, o contrato ou as condições gerais e os anexos técnicos, com três linhas sobre o problema que a empresa quer resolver.",
              },
              {
                title: "Chamada de 30 minutos",
                description: "Para perceber como a empresa trabalha hoje e porque pediu a proposta.",
              },
              {
                title: "Análise e relatório",
                description: "Relatório escrito, entregue em 5 dias úteis a contar da receção de todos os documentos.",
              },
              {
                title: "Reunião de 45 minutos",
                description: "Para explicar o relatório e responder a todas as dúvidas.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que recebe */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">O que recebe</h2>
          <div className="space-y-3 text-gray-700">
            {[
              "Relatório escrito com a análise ponto a ponto",
              "Custo total estimado a 3 anos",
              "Lista de perguntas pronta a enviar ao fornecedor",
              "Pontos a negociar antes de assinar",
              "Recomendação clara: assinar, negociar estes pontos, ou não assinar",
            ].map((text, index) => (
              <p key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                <span>{text}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Duas formas de contratar */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">Duas formas de contratar</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold text-primary mb-3">Revisão de uma proposta</h3>
              <p className="text-gray-600">
                Uma proposta, com o respetivo contrato e anexos técnicos. Preço fechado.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold text-primary mb-3">Comparação de propostas</h3>
              <p className="text-gray-600">
                De 2 a 3 fornecedores: a mesma análise para cada proposta, uma grelha comparativa lado a lado e uma
                recomendação final. Preço fechado.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto mt-6">
            Há uma opção de entrega urgente em 3 dias úteis, para propostas com prazo de validade curto. O valor de
            cada modalidade é indicado na chamada inicial, antes de qualquer compromisso.
          </p>
        </div>
      </section>

      {/* Para que tipo de software */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">Para que tipo de software</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 md:p-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  <span className="font-semibold text-primary">Incluído: </span>
                  ERP, CRM, software de gestão e faturação, gestão de projetos e desenvolvimento de software à
                  medida.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8">
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  <span className="font-semibold text-primary">Fora deste serviço: </span>
                  software técnico ou industrial, como CAD, BIM ou controlo de produção. Nos ERP com módulo de
                  produção, a análise cobre as partes comercial, financeira, contratual e de integrações.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto mt-6">
            A revisão não substitui a leitura jurídica do contrato por um advogado.
          </p>
        </div>
      </section>

      {/* Sem comissões */}
      <section className="py-16 md:py-24 bg-[#002642] text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sem comissões nem parcerias com fornecedores</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Não recebo comissões de nenhum fornecedor de software nem tenho parcerias comerciais. A recomendação
            depende apenas do que serve a empresa, incluindo quando a resposta é não assinar. São 20 anos de
            engenharia informática e consultoria ao serviço de uma decisão: comprar o que a empresa precisa, e não
            o que lhe querem vender.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection dict={{ title: "Perguntas frequentes", items: faqItems }} />

      {/* CTA final */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">O primeiro passo são 15 minutos</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Uma chamada sem compromisso para perceber a proposta que tem em mãos e se a revisão faz sentido.
          </p>
          <Link href="/pt/contact">
            <Button size="lg" className="bg-customGold text-primary hover:bg-primary hover:text-white transition-colors">
              Agendar chamada sem compromisso
            </Button>
          </Link>
        </div>
      </section>

      <Footer dict={dict.footer} />
    </main>
  )
}
