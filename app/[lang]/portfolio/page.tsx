import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  try {
    const dict = await getDictionary(params.lang)
    return {
      title: dict.portfolio?.title || "Portfolio - Alexandra Ribeiro",
      description: dict.portfolio?.description || "View my portfolio of digital projects and services",
    }
  } catch (error) {
    return {
      title: "Portfolio - Alexandra Ribeiro",
      description: "View my portfolio of digital projects and services",
    }
  }
}

export default async function PortfolioPage({ params }: { params: { lang: string } }) {
  try {
    const dict = await getDictionary(params.lang)
    const isPortuguese = params.lang === "pt"

    // Portfolio content in both languages
    // const portfolioContent = {
    //   instagram: {
    //     title: isPortuguese ? "Instagram com respostas automáticas" : "Instagram with automated responses",
    //     description: isPortuguese
    //       ? "Implementei um sistema de automação no Instagram que usa a ferramenta ManyChat para responder automaticamente a comentários e mensagens. Não acredita? Vá ao meu perfil e comente numa publicação (ou em mensagem) a palavra FLOW - vai receber uma resposta imediata!"
    //       : "I implemented an automation system on Instagram that uses the ManyChat tool to automatically respond to comments and messages. Don't believe it? Go to my profile and comment on a post (or in a message) the word FLOW - you'll receive an immediate response!",
    //     cta: isPortuguese ? "Ver Perfil" : "View Profile",
    //   },
    //   etsy: {
    //     title: isPortuguese ? "Loja digital de sucesso na Etsy" : "Successful digital store on Etsy",
    //     description: isPortuguese
    //       ? 'A minha loja "Healthy Gut Essentials" na Etsy é um exemplo real de como estruturo negócios digitais para vender produtos online. Sou Star Seller desde fevereiro de 2025 (menos de 6 meses depois de iniciar!) e aqui pode ver na prática como organizo, apresento e automatizo vendas de produtos digitais.'
    //       : 'My "Healthy Gut Essentials" store on Etsy is a real example of how I structure digital businesses to sell products online. I\'ve been a Star Seller since February 2025 (less than 6 months after starting!) and here you can see in practice how I organize, present, and automate digital product sales.',
    //     cta: isPortuguese ? "Ver Loja" : "View Store",
    //   },
    //   wordpress: {
    //     title: isPortuguese
    //       ? "E-commerce completo: WordPress e WooCommerce"
    //       : "Complete e-commerce: WordPress and WooCommerce",
    //     description: isPortuguese
    //       ? "Este foi o meu website anterior, que desenvolvi quando me iniciei como Assistente Virtual. Desenvolvido com WordPress e WooCommerce, mostra como implemento lojas online robustas usando uma das plataformas mais versáteis do mercado. Um exemplo de sistema completo em funcionamento."
    //       : "This was my previous website, which I developed when I started as a Virtual Assistant. Developed with WordPress and WooCommerce, it shows how I implement robust online stores using one of the most versatile platforms on the market. An example of a complete system in operation.",
    //     cta: isPortuguese ? "Ver Website" : "View Website",
    //   },
    //   shopify: {
    //     title: isPortuguese ? "Projeto de Loja Shopify funcional" : "Functional Shopify Store Project",
    //     description: isPortuguese
    //       ? '"Oh So Portugal" é uma loja de presentes portugueses que criei com Shopify, como projeto final da minha especialização em E-commerce. É uma loja de demonstração totalmente funcional - pode navegar, adicionar produtos ao carrinho e testar todo o processo de compra.'
    //       : '"Oh So Portugal" is a Portuguese gift store I created with Shopify as my final project for my E-commerce specialization. It\'s a fully functional demonstration store - you can browse, add products to your cart, and test the entire purchase process.',
    //     password: isPortuguese ? "Senha" : "Password",
    //     cta: isPortuguese ? "Ver Loja" : "View Store",
    //   },
    //   newsletter: {
    //     title: isPortuguese ? "Sistema de email marketing automatizado" : "Automated email marketing system",
    //     description: isPortuguese
    //       ? "Quer ver uma sequência de emails estruturada em acção? Subscreva a minha newsletter neste site e receberá automaticamente a minha sequência de boas-vindas criada no Mailerlite. É um exemplo prático de como nutrir leads através de email marketing automatizado."
    //       : "Want to see a structured email sequence in action? Subscribe to my newsletter on this site and you'll automatically receive my welcome sequence created in Mailerlite. It's a practical example of how to nurture leads through automated email marketing.",
    //     placeholder: isPortuguese ? "O seu email" : "Your email",
    //     button: isPortuguese ? "Subscrever" : "Subscribe",
    //   },
    //   landingPage: {
    //     title: isPortuguese ? "Landing page de alta conversão" : "High-conversion landing page",
    //     description: isPortuguese
    //       ? "Esta página de captura foi criada para um dos meus lead magnets da loja Etsy. É um exemplo perfeito de como desenho páginas que convertem visitantes em subscritores, oferecendo valor real em troca do email. Simples, eficaz e otimizada para conversão."
    //       : "This landing page was created for one of my lead magnets from my Etsy store. It's a perfect example of how I design pages that convert visitors into subscribers, offering real value in exchange for their email. Simple, effective, and optimized for conversion.",
    //     cta: isPortuguese ? "Ver Página de Captura" : "View Landing Page",
    //   },
    // }

    return (
      <main className="min-h-screen">
        <SiteHeader dict={dict} />

        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-primary/10 via-background to-primary/10 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-primary">
              <span className="font-bold">
                {isPortuguese ? "Portfólio de Sistemas Digitais:" : "Digital Systems Portfolio:"}
              </span>
              <br />
              <br />
              <span className="font-normal">
                {isPortuguese
                  ? "exemplos de implementações reais para novos empreendedores e lojas online"
                  : "real implementation examples for new entrepreneurs and online stores"}
              </span>
            </h1>
            <h2 className="text-lg md:text-xl max-w-4xl mx-auto text-muted-foreground">
              {isPortuguese
                ? "Veja na prática como implemento sistemas técnicos completos para negócios em fase de lançamento. Cada projeto demonstra soluções reais que pode testar e explorar livremente."
                : "See in practice how I implement complete technical systems for businesses in the launch phase. Each project demonstrates real solutions that you can test and explore freely."}
            </h2>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Instagram */}
            <div className="bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/manychat-workflow-for-ig-hKRUBayD1hQbSnjUQ4XuBxF270I4Sn.png"
                  alt="ManyChat Workflow for Instagram"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">
                  {isPortuguese ? "Instagram com respostas automáticas" : "Instagram with automated responses"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isPortuguese
                    ? "Implementei um sistema de automação no Instagram que usa a ferramenta ManyChat para responder automaticamente a comentários e mensagens. Não acredita? Vá ao meu perfil e comente numa publicação (ou em mensagem) a palavra FLOW - vai receber uma resposta imediata!"
                    : "I implemented an automation system on Instagram that uses the ManyChat tool to automatically respond to comments and messages. Don't believe it? Go to my profile and comment on a post (or in a message) the word FLOW - you'll receive an immediate response!"}
                </p>
                <a
                  href="https://www.instagram.com/alexandraribeiro.pt"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isPortuguese ? "Ver Perfil" : "View Profile"}
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>

            {/* Etsy Store */}
            <div className="bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <div className="absolute top-0 left-0 w-[150%] h-[150%]">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/etsy-store-star-seller.PNG-njPspMME69IGtvmsMgijdVRge3M77C.png"
                    alt="Etsy Store Star Seller"
                    className="w-full h-full object-cover object-left-top"
                    style={{ objectPosition: "0 0" }}
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">
                  {isPortuguese ? "Loja digital de sucesso na Etsy" : "Successful digital store on Etsy"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isPortuguese
                    ? 'A minha loja "Healthy Gut Essentials" na Etsy é um exemplo real de como estruturo negócios digitais para vender produtos online. Sou Star Seller desde fevereiro de 2025 (menos de 6 meses depois de iniciar!) e aqui pode ver na prática como organizo, apresento e automatizo vendas de produtos digitais.'
                    : 'My "Healthy Gut Essentials" store on Etsy is a real example of how I structure digital businesses to sell products online. I\'ve been a Star Seller since February 2025 (less than 6 months after starting!) and here you can see in practice how I organize, present, and automate digital product sales.'}
                </p>
                <a
                  href="https://healthygutessentials.etsy.com"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isPortuguese ? "Ver Loja" : "View Store"}
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>

            {/* WordPress Website */}
            <div className="bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loja-woocommerce-site-wordpress.PNG-whufMdzF5nWx9HcuF8khZaih93ZM5K.png"
                  alt="WordPress Website with WooCommerce"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">
                  {isPortuguese
                    ? "E-commerce completo: WordPress e WooCommerce"
                    : "Complete e-commerce: WordPress and WooCommerce"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isPortuguese
                    ? "Este foi o meu website anterior, que desenvolvi quando me iniciei como Assistente Virtual. Desenvolvido com WordPress e WooCommerce, mostra como implemento lojas online robustas usando uma das plataformas mais versáteis do mercado. Um exemplo de sistema completo em funcionamento."
                    : "This was my previous website, which I developed when I started as a Virtual Assistant. Developed with WordPress and WooCommerce, it shows how I implement robust online stores using one of the most versatile platforms on the market. An example of a complete system in operation."}
                </p>
                <a
                  href="https://alexandraribeiro-av.pt/"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isPortuguese ? "Ver Website" : "View Website"}
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>

            {/* Shopify Store */}
            <div className="bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <div className="absolute top-0 left-0 w-[150%] h-[150%]">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oh-so-portugal-website-shopify.PNG-YHVSsS8rKpulmkCJqtEmGgaD1VPd55.png"
                    alt="Oh So Portugal Shopify Store"
                    className="w-full h-full object-cover object-left-top"
                    style={{ objectPosition: "0 0" }}
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">
                  {isPortuguese ? "Projeto de Loja Shopify funcional" : "Functional Shopify Store Project"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isPortuguese
                    ? '"Oh So Portugal" é uma loja de presentes portugueses que criei com Shopify, como projeto final da minha especialização em E-commerce. É uma loja de demonstração totalmente funcional - pode navegar, adicionar produtos ao carrinho e testar todo o processo de compra.'
                    : '"Oh So Portugal" is a Portuguese gift store I created with Shopify as my final project for my E-commerce specialization. It\'s a fully functional demonstration store - you can browse, add products to your cart, and test the entire purchase process.'}
                </p>
                <div className="mb-2 text-sm text-muted-foreground">
                  <span className="font-medium">{isPortuguese ? "Senha" : "Password"}:</span> Sh0p!052025
                </div>
                <a
                  href="https://oh-so-portugal-store.myshopify.com/"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isPortuguese ? "Ver Loja" : "View Store"}
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newsletter-automation-tablet.jpg-MTuET2KjMk2nS8XPG3tCCKdB40bKRd.jpeg"
                  alt="Newsletter Automation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">
                  {isPortuguese ? "Sistema de email marketing automatizado" : "Automated email marketing system"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isPortuguese
                    ? "Quer ver uma sequência de emails estruturada em acção? Subscreva a minha newsletter neste site e receberá automaticamente a minha sequência de boas-vindas criada no Mailerlite. É um exemplo prático de como nutrir leads através de email marketing automatizado."
                    : "Want to see a structured email sequence in action? Subscribe to my newsletter on this site and you'll automatically receive my welcome sequence created in Mailerlite. It's a practical example of how to nurture leads through automated email marketing."}
                </p>
                <form className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder={isPortuguese ? "O seu email" : "Your email"}
                    className="flex-1 h-8 px-3 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                  <button
                    type="submit"
                    className="h-8 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    {isPortuguese ? "Subscrever" : "Subscribe"}
                  </button>
                </form>
              </div>
            </div>

            {/* Landing Page */}
            <div className="bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-64 w-full overflow-hidden bg-muted">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/landing-page-e-book.PNG-RKdP0NPcSoLjK4kBvhtbLtwXDiioE7.png"
                  alt="IBS E-book Landing Page"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">
                  {isPortuguese ? "Landing page de alta conversão" : "High-conversion landing page"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isPortuguese
                    ? "Esta página de captura foi criada para um dos meus lead magnets da loja Etsy. É um exemplo perfeito de como desenho páginas que convertem visitantes em subscritores, oferecendo valor real em troca do email. Simples, eficaz e otimizada para conversão."
                    : "This landing page was created for one of my lead magnets from my Etsy store. It's a perfect example of how I design pages that convert visitors into subscribers, offering real value in exchange for their email. Simple, effective, and optimized for conversion."}
                </p>
                <a
                  href="https://subscribepage.io/healthy-gut-manage-your-ibs-ebook"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isPortuguese ? "Ver Página de Captura" : "View Landing Page"}
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer dict={dict.footer} />
      </main>
    )
  } catch (error) {
    console.error("Error in PortfolioPage:", error)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Portfolio</h1>
          <p className="text-muted-foreground">Please try refreshing the page.</p>
        </div>
      </main>
    )
  }
}
