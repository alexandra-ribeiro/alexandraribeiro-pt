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

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader dict={dict} />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
    Olá, sou a <span className="text-customGold">Alexandra</span>, a sua parceira técnica.
  </h1>

  {/* Nova frase de enquadramento (Sugestão 1) */}
  <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl">
    Ajudo empreendedores, PME e negócios digitais a manter os seus sistemas organizados,
    funcionais e sem stress técnico.
  </p>

  <div className="space-y-4 text-gray-700">
    <p>
      Naquele momento em que decidiu sair do conforto corporativo para iniciar o seu próprio
      negócio, surgiu uma avalanche de perguntas técnicas na sua cabeça, não foi?
    </p>

    {/* Bloco de perguntas simplificado (Sugestão 2) */}
    <p>
      Como configurar um email profissional? Que sistema de faturação escolher? Onde guardar
      os dados dos clientes — preciso de um CRM? Shopify, WordPress ou apenas um marketplace
      como a Etsy?
    </p>

    <p>
      E de repente, em vez de se focar no seu negócio, está no YouTube a tentar entender
      configurações técnicas até altas horas da madrugada.
    </p>

    <p>
      Conheço bem essa jornada porque também a percorri. Após 20 anos no mundo corporativo
      como engenheira informática, decidi dar esse salto e percebi que, mesmo com conhecimento
      técnico, a quantidade de decisões e configurações pode ser intimidante.
    </p>

    {/* Frase final reforçada com benefício claro */}
    <p className="font-bold">
      É exatamente por isso que hoje ajudo empreendedores como você a implementar sistemas
      descomplicados — para que possa focar-se no negócio, não na tecnologia.
    </p>
  </div>
</div>
            <div className="relative">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/design-mode/1photo.png.jpeg"
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

      {/* Story Section - Updated to two columns */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">{dict.about.story.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Timeline Image - Left Column */}
            <div className="relative">
              <div className="relative w-full h-auto">
                <Image
                  src="/images/a-minha-historia-profissional.png"
                  alt="Minha História Profissional - Timeline"
                  width={500}
                  height={800}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* Story Text - Right Column */}
            <div className="space-y-4 text-gray-700">
              <p>
  A minha jornada começou há mais de duas décadas, com formação em Engenharia Informática e uma carreira sólida no
  mundo corporativo, onde implementei sistemas complexos e liderei projetos nacionais e internacionais.
</p>

<p>
  Ao longo desses anos, ganhei uma base forte em infraestrutura, bases de dados, segurança e boas práticas para
  sistemas empresariais — competências que viriam a revelar-se essenciais mais tarde.
</p>

<p>
  Quando decidi transitar para o empreendedorismo, percebi rapidamente que criar um negócio envolve muito mais do
  que uma boa ideia. Para quem não tem formação técnica, escolher e configurar ferramentas pode tornar-se um enorme
  obstáculo.
</p>

<p>
  Hoje, uso essa experiência técnica e a minha própria transição corporativo-empreendedora para ajudar outros
  empreendedores a criar sistemas eficientes, simples e prontos a crescer desde o início.
</p>

<p>
  É assim que transformo mais de 20 anos de experiência em soluções práticas para negócios como o seu.
</p>

            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Updated to 4 columns */}
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

      {/* Tools Section - Updated from Experience Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Exemplos de ferramentas, softwares e plataformas com as quais trabalho:
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>Faturação: Moloni, InvoiceXpress, Primavera (softwares portugueses, certificados pela AT)</span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>CRM e Gestão: Notion, Trello, Atlassian Jira</span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>E-commerce: Shopify, Shopkit, Etsy, WooCommerce</span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>Produtividade: Google Workspace, Microsoft 365</span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>Visual: Canva Pro, Figma</span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>Bases de Dados: SQL</span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                  <span>
                    Automação e IA: ferramentas no-code (n8n, GPT Maker, Zapier, Make.com), Mailerlite,
                    Mailchimp
                  </span>
                </p>
                <p className="text-lg font-medium mt-2">… e mais!</p>
              </div>
            </div>
            <div>
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/design-mode/softwares%20and%20tools%20virtual%20assistant.JPG.jpeg"
                  alt="Workspace with tools and software"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
  <div className="max-w-5xl mx-auto px-4">
    <div className="max-w-2xl mx-auto text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
        Para quem é este trabalho?
      </h2>
      <p className="text-gray-700">
        Trabalho com negócios que precisam de estrutura técnica clara, sem complicações
        desnecessárias.
      </p>
    </div>

    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <li className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <p className="font-medium text-primary">
          Empreendedores em início de atividade
        </p>
        <p className="text-sm text-gray-700 mt-2">
          Que querem começar com bases sólidas e evitar erros técnicos comuns.
        </p>
      </li>

      <li className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <p className="font-medium text-primary">
          PME sem equipa técnica interna
        </p>
        <p className="text-sm text-gray-700 mt-2">
          Que precisam de alguém de confiança para gerir e ajustar os sistemas digitais.
        </p>
      </li>

      <li className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <p className="font-medium text-primary">
          Negócios digitais em crescimento
        </p>
        <p className="text-sm text-gray-700 mt-2">
          Que precisam de estrutura e organização, não mais ferramentas soltas.
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
