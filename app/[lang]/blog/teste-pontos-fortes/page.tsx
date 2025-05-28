import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import BlogArticle from "@/components/blog-article"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const title = params.lang === "en" ? "Strengths Quiz" : "Teste de Pontos Fortes"

  return {
    title: `${title} | ${dict.metadata.title}`,
    description:
      params.lang === "en"
        ? "Take the quiz to see what type of virtual online position is right for you and what clients will pay for."
        : "Faça o teste para descobrir qual tipo de posição virtual é ideal para você e o que os clientes pagarão por isso.",
  }
}

export default async function BlogArticlePage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  const articleData = {
    title: params.lang === "en" ? "Strengths Quiz" : "Teste de Pontos Fortes",
    date: params.lang === "en" ? "April 10, 2025" : "10 de abril, 2025",
    image: "/placeholder.svg?height=400&width=800&text=Teste+Pontos+Fortes",
    content:
      params.lang === "en"
        ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      Understanding your unique talents and natural abilities is crucial for finding the right virtual position. Employers value these inherent strengths and are willing to pay a premium for them. This quiz will help you identify your core strengths and match them to the most suitable virtual roles.

      Why Your Natural Strengths Matter
      
      Your natural talents are the abilities that come easily to you—things you do almost effortlessly while others might struggle with them. These innate strengths are your most valuable assets in the job market. When you work in a role that aligns with your natural abilities, you'll not only perform better but also enjoy your work more.

      How the Quiz Works
      
      This comprehensive assessment evaluates your preferences, working style, and natural inclinations across several dimensions:
      
      - Communication style and preferences
      - Problem-solving approaches
      - Organization and planning tendencies
      - Creative thinking patterns
      - Technical aptitude and interests
      
      Based on your responses, we'll identify your dominant strength areas and match them to virtual positions where these strengths are most valued.

      What You'll Discover
      
      After completing the quiz, you'll receive a detailed profile outlining:
      
      1. Your top three strength areas
      2. The virtual positions that best match your natural abilities
      3. The skills most valued by employers in these positions
      4. Typical pay ranges for these roles
      5. Recommended resources to develop complementary skills
      
      Take the first step toward finding your ideal virtual position by taking our Strengths Quiz today. Remember, when you work from your strengths, you'll not only be more successful but also more fulfilled in your career.`
        : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      Compreender seus talentos únicos e habilidades naturais é crucial para encontrar a posição virtual certa. Os empregadores valorizam essas forças inerentes e estão dispostos a pagar um prêmio por elas. Este teste ajudará você a identificar seus pontos fortes principais e combiná-los com as funções virtuais mais adequadas.

      Por Que Seus Pontos Fortes Naturais Importam
      
      Seus talentos naturais são as habilidades que vêm facilmente para você—coisas que você faz quase sem esforço, enquanto outros podem lutar com elas. Essas forças inatas são seus ativos mais valiosos no mercado de trabalho. Quando você trabalha em uma função que se alinha com suas habilidades naturais, você não apenas terá um desempenho melhor, mas também gostará mais do seu trabalho.

      Como o Teste Funciona
      
      Esta avaliação abrangente avalia suas preferências, estilo de trabalho e inclinações naturais em várias dimensões:
      
      - Estilo e preferências de comunicação
      - Abordagens de resolução de problemas
      - Tendências de organização e planejamento
      - Padrões de pensamento criativo
      - Aptidão e interesses técnicos
      
      Com base em suas respostas, identificaremos suas áreas de força dominantes e as combinaremos com posições virtuais onde essas forças são mais valorizadas.

      O Que Você Descobrirá
      
      Após completar o teste, você receberá um perfil detalhado descrevendo:
      
      1. Suas três principais áreas de força
      2. As posições virtuais que melhor correspondem às suas habilidades naturais
      3. As habilidades mais valorizadas pelos empregadores nessas posições
      4. Faixas salariais típicas para essas funções
      5. Recursos recomendados para desenvolver habilidades complementares
      
      Dê o primeiro passo para encontrar sua posição virtual ideal fazendo nosso Teste de Pontos Fortes hoje. Lembre-se, quando você trabalha a partir de seus pontos fortes, você não apenas será mais bem-sucedido, mas também mais realizado em sua carreira.`,
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
