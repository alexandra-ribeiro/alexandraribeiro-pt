import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import BlogArticle from "@/components/blog-article"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const title = params.lang === "en" ? "Freebie: 10 Tasks" : "Guia Gratuito: 10 Tarefas"

  return {
    title: `${title} | ${dict.metadata.title}`,
    description:
      params.lang === "en"
        ? "Download my most-requested digital marketing services so you know what services to offer."
        : "Faça download do meu guia com as tarefas mais solicitadas em marketing digital para saber quais serviços oferecer.",
  }
}

export default async function BlogArticlePage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  const articleData = {
    title: params.lang === "en" ? "Freebie: 10 Tasks" : "Guia Gratuito: 10 Tarefas",
    date: params.lang === "en" ? "April 18, 2025" : "18 de abril, 2025",
    image: "/placeholder.svg?height=400&width=800&text=Guia+10+Tarefas",
    content:
      params.lang === "en"
        ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      Digital marketing has become an essential part of any business strategy. Understanding which services are most in demand can help you position yourself effectively in the market. This guide outlines the 10 most requested digital marketing tasks that clients are willing to pay for.

      The beauty of these tasks is that you don't need to be a specialist or coder to begin offering them. With some basic training and the right tools, you can start providing these services to clients immediately.

      Task #1: Social Media Management
      One of the most requested services is social media management. Businesses know they need to be active on social platforms but often lack the time or expertise to maintain a consistent presence. This includes content creation, scheduling posts, engaging with followers, and analyzing performance metrics.

      Task #2: Email Marketing Campaigns
      Email remains one of the most effective marketing channels with an impressive ROI. Clients need help designing templates, writing compelling copy, segmenting their audience, and analyzing campaign results.

      Task #3: Content Creation
      Quality content is the backbone of digital marketing. From blog posts and articles to infographics and videos, businesses are constantly seeking fresh content that engages their audience and improves their SEO.

      Task #4: Basic SEO Implementation
      While advanced SEO might require specialized knowledge, many basic SEO tasks can be performed without extensive technical expertise. This includes keyword research, on-page optimization, and creating meta descriptions.

      Task #5: Website Updates and Maintenance
      Many businesses have websites but lack the time or knowledge to keep them updated. Regular maintenance, content updates, and minor design tweaks are services that are always in demand.

      Download the complete guide to discover the remaining five tasks and start offering these services to your clients today!`
        : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      O marketing digital tornou-se uma parte essencial de qualquer estratégia de negócios. Compreender quais serviços são mais procurados pode ajudá-lo a se posicionar efetivamente no mercado. Este guia descreve as 10 tarefas de marketing digital mais solicitadas pelas quais os clientes estão dispostos a pagar.

      A beleza dessas tarefas é que você não precisa ser um especialista ou programador para começar a oferecê-las. Com algum treinamento básico e as ferramentas certas, você pode começar a fornecer esses serviços aos clientes imediatamente.

      Tarefa #1: Gestão de Redes Sociais
      Um dos serviços mais solicitados é a gestão de redes sociais. As empresas sabem que precisam estar ativas nas plataformas sociais, mas muitas vezes não têm tempo ou expertise para manter uma presença consistente. Isso inclui criação de conteúdo, agendamento de posts, interação com seguidores e análise de métricas de desempenho.

      Tarefa #2: Campanhas de Email Marketing
      O email continua sendo um dos canais de marketing mais eficazes, com um ROI impressionante. Os clientes precisam de ajuda para criar templates, escrever textos persuasivos, segmentar seu público e analisar os resultados das campanhas.

      Tarefa #3: Criação de Conteúdo
      Conteúdo de qualidade é a espinha dorsal do marketing digital. De posts de blog e artigos a infográficos e vídeos, as empresas estão constantemente buscando conteúdo fresco que engaje seu público e melhore seu SEO.

      Tarefa #4: Implementação Básica de SEO
      Embora o SEO avançado possa exigir conhecimentos especializados, muitas tarefas básicas de SEO podem ser realizadas sem ampla expertise técnica. Isso inclui pesquisa de palavras-chave, otimização on-page e criação de meta descrições.

      Tarefa #5: Atualizações e Manutenção de Sites
      Muitas empresas têm sites, mas não têm tempo ou conhecimento para mantê-los atualizados. Manutenção regular, atualizações de conteúdo e pequenos ajustes de design são serviços sempre em demanda.

      Faça o download do guia completo para descobrir as cinco tarefas restantes e comece a oferecer esses serviços aos seus clientes hoje mesmo!`,
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
