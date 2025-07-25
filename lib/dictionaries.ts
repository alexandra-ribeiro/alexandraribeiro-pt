export type Locale = "pt" | "en"

const dictionaries = {
  pt: {
    metadata: {
      title: "Alexandra Ribeiro | Consultora Digital e Assistente Virtual Técnica em Portugal",
      description: "Consultoria digital e implementação simplificada de sistemas para empreendedores e lojas online",
    },
    hero: {
      title: "Alexandra Ribeiro",
      subtitle: "Consultora Digital e Assistente Virtual Técnica",
      description:
        "Especializada em consultoria digital, assistência virtual técnica e otimização de processos empresariais para empreendedores e lojas online.",
      cta: "Contactar Agora",
      secondaryCta: "Saber Mais",
      headline: "Alexandra Ribeiro",
      subheadline: "Consultora Digital e Assistente Virtual Técnica",
    },
    nav: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contacto",
      store: "Loja",
    },
    aboutMe: {
      title: "Sobre Mim",
      description:
        "Consultora digital com mais de 5 anos de experiência em assistência virtual técnica e otimização de processos empresariais.",
      experience: "Anos de Experiência",
      skills: ["Consultoria Digital", "Assistência Virtual", "Gestão de Projetos"],
    },
    whatIsVA: {
      title: "O que é um Assistente Virtual?",
      description:
        "Um assistente virtual é um profissional que oferece serviços de apoio administrativo, técnico e criativo de forma remota.",
      benefits: ["Flexibilidade", "Eficiência", "Economia"],
    },
    whyChooseVA: {
      title: "Porquê Escolher um Assistente Virtual?",
      reasons: [
        {
          title: "Flexibilidade",
          description: "Trabalho adaptado às suas necessidades",
        },
      ],
    },
    certifications: {
      title: "Certificações",
      description: "Certificações profissionais",
      items: [],
    },
    blogPreview: {
      title: "Blog",
      description: "Artigos e dicas",
      readMore: "Ler mais",
    },
    finalCTA: {
      title: "Pronto para começar?",
      description: "Entre em contacto connosco",
      cta: "Contactar",
    },
    footer: {
      description:
        "Consultora digital especializada em assistência virtual técnica e otimização de processos empresariais.",
      quickLinks: "Links Rápidos",
      services: "Serviços",
      contact: "Contacto",
      copyright: "Todos os direitos reservados.",
      newsletter: {
        title: "Newsletter",
        description: "Receba dicas e novidades sobre marketing digital.",
        placeholder: "O seu email",
        subscribe: "Subscrever",
        success: "Subscrito com sucesso!",
        error: "Erro ao subscrever. Tente novamente.",
      },
    },
    newsletterPopup: {
      title: "Newsletter",
      description: "Subscreva a nossa newsletter",
      placeholder: "O seu email",
      subscribe: "Subscrever",
      close: "Fechar",
    },
    navigation: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contacto",
      store: "Loja",
    },
    store: {
      title: "Loja Digital",
      seoHeading: "Produtos e serviços digitais",
      noProductsFound: "Nenhum produto encontrado",
      buyButton: "Comprar",
    },
    product: {
      noImage: "Sem imagem disponível",
      buyNow: "Comprar agora",
    },
    common: {
      loading: "A carregar...",
      error: "Erro",
      retry: "Tentar novamente",
    },
  },
  en: {
    metadata: {
      title: "Alexandra Ribeiro | Digital Consultant and Technical Virtual Assistant in Portugal",
      description: "Digital consulting and simplified systems implementation for entrepreneurs and online stores",
    },
    hero: {
      title: "Alexandra Ribeiro",
      subtitle: "Digital Consultant and Technical Virtual Assistant",
      description:
        "Specialized in digital consulting, technical virtual assistance, and business process optimization for entrepreneurs and online stores.",
      cta: "Contact Now",
      secondaryCta: "Learn More",
      headline: "Alexandra Ribeiro",
      subheadline: "Digital Consultant and Technical Virtual Assistant",
    },
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
      store: "Store",
    },
    aboutMe: {
      title: "About Me",
      description:
        "Digital consultant with over 5 years of experience in technical virtual assistance and business process optimization.",
      experience: "Years of Experience",
      skills: ["Digital Consulting", "Virtual Assistance", "Project Management"],
    },
    whatIsVA: {
      title: "What is a Virtual Assistant?",
      description:
        "A virtual assistant is a professional who offers administrative, technical, and creative support services remotely.",
      benefits: ["Flexibility", "Efficiency", "Cost Savings"],
    },
    whyChooseVA: {
      title: "Why Choose a Virtual Assistant?",
      reasons: [
        {
          title: "Flexibility",
          description: "Work adapted to your needs",
        },
      ],
    },
    certifications: {
      title: "Certifications",
      description: "Professional certifications",
      items: [],
    },
    blogPreview: {
      title: "Blog",
      description: "Articles and tips",
      readMore: "Read more",
    },
    finalCTA: {
      title: "Ready to start?",
      description: "Contact us",
      cta: "Contact",
    },
    footer: {
      description: "Digital consultant specialized in technical virtual assistance and business process optimization.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact",
      copyright: "All rights reserved.",
      newsletter: {
        title: "Newsletter",
        description: "Get tips and news about digital marketing.",
        placeholder: "Your email",
        subscribe: "Subscribe",
        success: "Successfully subscribed!",
        error: "Error subscribing. Please try again.",
      },
    },
    newsletterPopup: {
      title: "Newsletter",
      description: "Subscribe to our newsletter",
      placeholder: "Your email",
      subscribe: "Subscribe",
      close: "Close",
    },
    navigation: {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
      store: "Store",
    },
    store: {
      title: "Digital Store",
      seoHeading: "Digital products and services",
      noProductsFound: "No products found",
      buyButton: "Buy",
    },
    product: {
      noImage: "No image available",
      buyNow: "Buy now",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      retry: "Try again",
    },
  },
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.pt
}
