import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import BlogArticle from "@/components/blog-article"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const title = params.lang === "en" ? "DMA Training Series" : "Série de Formação"

  return {
    title: `${title} | ${dict.metadata.title}`,
    description:
      params.lang === "en"
        ? "Step into the role of highly paid, highly prized freelance marketer by mastering in-demand marketing services."
        : "Entre no papel de freelancer bem pago e valorizado dominando o marketing digital sob demanda.",
  }
}

export default async function BlogArticlePage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  const articleData = {
    title: params.lang === "en" ? "DMA Training Series" : "Série de Formação",
    date: params.lang === "en" ? "April 2, 2025" : "2 de abril, 2025",
    image: "/placeholder.svg?height=400&width=800&text=Série+Formação",
    content:
      params.lang === "en"
        ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      Are you ready to transform your career and step into the role of a highly paid, highly prized freelance digital marketing assistant? Our comprehensive DMA Training Series is designed to equip you with the skills, knowledge, and confidence to master in-demand marketing services and set up your business for paying clients.

      What You'll Learn in This Training Series

      Module 1: Foundation of Digital Marketing
      - Understanding the digital marketing ecosystem
      - Identifying high-demand services you can offer
      - Setting up your professional online presence
      - Pricing your services competitively

      Module 2: Essential Marketing Services
      - Social media management and strategy
      - Email marketing campaigns that convert
      - Content creation and content calendars
      - Basic SEO implementation
      - Paid advertising management

      Module 3: Client Acquisition and Management
      - Finding your ideal clients
      - Crafting proposals that win business
      - Onboarding new clients effectively
      - Managing client expectations
      - Delivering exceptional results

      Module 4: Business Operations
      - Setting up your business legally
      - Managing finances and taxes
      - Creating efficient workflows
      - Scaling your services
      - Hiring subcontractors when needed

      Why This Training Is Different

      Unlike other programs that focus only on technical skills, our DMA Training Series takes a holistic approach to prepare you for success as a freelance digital marketing assistant. We combine practical skills training with business development strategies and real-world applications.

      Each module includes:
      - Video lessons with step-by-step instructions
      - Downloadable templates and resources
      - Practical assignments to build your portfolio
      - Access to our private community for support
      - Live Q&A sessions with experienced DMAs

      Join thousands of successful graduates who have used this training to build thriving freelance businesses, achieve financial freedom, and create the lifestyle they desire. The digital marketing industry continues to grow, and businesses are constantly seeking skilled professionals to help them navigate the online landscape.

      Enroll today and take the first step toward your new career as a highly sought-after Digital Marketing Assistant!`
        : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      Você está pronto para transformar sua carreira e entrar no papel de um assistente de marketing digital freelancer altamente pago e valorizado? Nossa abrangente Série de Formação foi projetada para equipá-lo com as habilidades, conhecimento e confiança para dominar serviços de marketing sob demanda e preparar seu negócio para clientes pagantes.

      O Que Você Aprenderá Nesta Série de Formação

      Módulo 1: Fundamentos de Marketing Digital
      - Compreendendo o ecossistema de marketing digital
      - Identificando serviços de alta demanda que você pode oferecer
      - Configurando sua presença profissional online
      - Precificando seus serviços de forma competitiva

      Módulo 2: Serviços Essenciais de Marketing
      - Gestão e estratégia de redes sociais
      - Campanhas de email marketing que convertem
      - Criação de conteúdo e calendários de conteúdo
      - Implementação básica de SEO
      - Gestão de publicidade paga

      Módulo 3: Aquisição e Gestão de Clientes
      - Encontrando seus clientes ideais
      - Elaborando propostas que ganham negócios
      - Integrando novos clientes de forma eficaz
      - Gerenciando expectativas dos clientes
      - Entregando resultados excepcionais

      Módulo 4: Operações de Negócios
      - Configurando seu negócio legalmente
      - Gerenciando finanças e impostos
      - Criando fluxos de trabalho eficientes
      - Escalando seus serviços
      - Contratando subcontratados quando necessário

      Por Que Este Treinamento É Diferente

      Diferentemente de outros programas que focam apenas em habilidades técnicas, nossa Série de Formação adota uma abordagem holística para prepará-lo para o sucesso como assistente de marketing digital freelancer. Combinamos treinamento de habilidades práticas com estratégias de desenvolvimento de negócios e aplicações do mundo real.

      Cada módulo inclui:
      - Aulas em vídeo com instruções passo a passo
      - Modelos e recursos para download
      - Tarefas práticas para construir seu portfólio
      - Acesso à nossa comunidade privada para suporte
      - Sessões de perguntas e respostas ao vivo com DMAs experientes

      Junte-se a milhares de graduados bem-sucedidos que usaram este treinamento para construir negócios freelance prósperos, alcançar liberdade financeira e criar o estilo de vida que desejam. A indústria de marketing digital continua a crescer, e as empresas estão constantemente buscando profissionais qualificados para ajudá-las a navegar no cenário online.

      Inscreva-se hoje e dê o primeiro passo em direção à sua nova carreira como um Assistente de Marketing Digital altamente procurado!`,
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader dict={dict} />

      <div className="container py-12 md:py-20">
        <BlogArticle
          title={articleData.title}
          date={articleData.date}
          image={articleData.image}
          content={articleData.content}
          lang={params.lang}
        />
      </div>

      <Footer dict={dict.footer} />
    </main>
  )
}
