// Type definition for blog articles
export type BlogArticle = {
  _id: string
  title: string
  slug: string
  description: string
  date: string
  image: string
  published: boolean
  language: string
  content?: string
  createdAt?: string
  updatedAt?: string
}

// Sample articles for fallback
const sampleArticlesPT = [
  {
    _id: "sample1",
    title: "Guia Gratuito: 10 Tarefas",
    slug: "guia-10-tarefas",
    description:
      "Faça download do meu guia com as tarefas mais solicitadas em marketing digital para saber quais serviços oferecer.",
    date: "18 de abril, 2025",
    image: "/placeholder.svg?height=200&width=400&text=Guia",
    published: true,
    language: "pt",
  },
  {
    _id: "sample2",
    title: "Teste de Pontos Fortes",
    slug: "teste-pontos-fortes",
    description:
      "Seus talentos e habilidades naturais são valiosos para empregadores. Faça o teste para descobrir qual tipo de posição virtual é ideal para você.",
    date: "10 de abril, 2025",
    image: "/placeholder.svg?height=200&width=400&text=Teste",
    published: true,
    language: "pt",
  },
  {
    _id: "sample3",
    title: "Série de Formação",
    slug: "serie-formacao",
    description:
      "Entre no papel de freelancer bem pago e valorizado dominando o marketing digital sob demanda, oferecendo serviços e preparando seu negócio.",
    date: "2 de abril, 2025",
    image: "/placeholder.svg?height=200&width=400&text=Formação",
    published: true,
    language: "pt",
  },
]

const sampleArticlesEN = [
  {
    _id: "sample4",
    title: "Freebie: 10 Tasks",
    slug: "freebie-10-tasks",
    description:
      "Download my most-requested digital marketing services so you know what services to offer. You'll see you don't have to be a specialist or coder to begin.",
    date: "April 18, 2025",
    image: "/placeholder.svg?height=200&width=400&text=Freebie",
    published: true,
    language: "en",
  },
  {
    _id: "sample5",
    title: "Strengths Quiz",
    slug: "strengths-quiz",
    description:
      "Your unique talents and natural abilities are so valuable to employers. Own it! Take the quiz to see what type of virtual online position is right for you.",
    date: "April 10, 2025",
    image: "/placeholder.svg?height=200&width=400&text=Quiz",
    published: true,
    language: "en",
  },
  {
    _id: "sample6",
    title: "DMA Training Series",
    slug: "dma-training-series",
    description:
      "Step into the role of highly paid, highly prized freelance marketer by mastering in-demand marketing services & getting your business set up.",
    date: "April 2, 2025",
    image: "/placeholder.svg?height=200&width=400&text=Training",
    published: true,
    language: "en",
  },
]

// Get sample articles by language
export function getSampleArticles(language: string): BlogArticle[] {
  return language === "pt" ? sampleArticlesPT : sampleArticlesEN
}

// Get all articles (sample only for server-side)
export function getAllArticles(): BlogArticle[] {
  // On the server, we can only return sample articles
  return [...sampleArticlesPT, ...sampleArticlesEN]
}

// Get articles by language
export function getArticlesByLanguage(language: string): BlogArticle[] {
  return getSampleArticles(language)
}

// Get an article by slug
export function getArticleBySlug(slug: string): BlogArticle | null {
  const allArticles = getAllArticles()
  return allArticles.find((article) => article.slug === slug) || null
}
