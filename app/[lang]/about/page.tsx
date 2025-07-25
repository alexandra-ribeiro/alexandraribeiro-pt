import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Users, Clock } from "lucide-react"

interface AboutPageProps {
  params: { lang: "pt" | "en" }
}

export default async function AboutPage({ params: { lang } }: AboutPageProps) {
  let dict

  try {
    dict = await getDictionary(lang)
  } catch (error) {
    console.error("Error loading dictionary:", error)
    dict = {
      aboutMe: {
        title: lang === "en" ? "About Me" : "Sobre Mim",
        description:
          lang === "en"
            ? "Digital consultant specialized in technical virtual assistance"
            : "Consultora digital especializada em assistência virtual técnica",
        experience: lang === "en" ? "Years of experience" : "Anos de experiência",
        skills: ["Digital Consulting", "Virtual Assistance", "Project Management"],
      },
      footer: {},
    }
  }

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      number: "100+",
      label: lang === "en" ? "Satisfied Clients" : "Clientes Satisfeitos",
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      number: "5+",
      label: lang === "en" ? "Years Experience" : "Anos de Experiência",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      number: "200+",
      label: lang === "en" ? "Projects Completed" : "Projetos Concluídos",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      number: "24/7",
      label: lang === "en" ? "Support Available" : "Suporte Disponível",
    },
  ]

  return (
    <main className="min-h-screen">
      <SiteHeader dict={dict} />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {dict?.aboutMe?.title || (lang === "en" ? "About Me" : "Sobre Mim")}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {dict?.aboutMe?.description ||
                (lang === "en"
                  ? "Digital consultant specialized in technical virtual assistance"
                  : "Consultora digital especializada em assistência virtual técnica")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <Image
                src="/images/alexandra-photo.jpeg"
                alt="Alexandra Ribeiro"
                width={500}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {lang === "en" ? "My Story" : "A Minha História"}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  {lang === "en"
                    ? "With over 5 years of experience in digital consulting and technical virtual assistance, I help entrepreneurs and businesses streamline their operations and achieve their goals through technology."
                    : "Com mais de 5 anos de experiência em consultoria digital e assistência virtual técnica, ajudo empreendedores e empresas a otimizar suas operações e alcançar seus objetivos através da tecnologia."}
                </p>
                <p>
                  {lang === "en"
                    ? "My expertise spans across various platforms and tools, from WordPress and Shopify to CRM systems and automation tools. I believe in providing personalized solutions that fit each client's unique needs."
                    : "A minha experiência abrange várias plataformas e ferramentas, desde WordPress e Shopify até sistemas CRM e ferramentas de automação. Acredito em fornecer soluções personalizadas que se adequam às necessidades únicas de cada cliente."}
                </p>
                <p>
                  {lang === "en"
                    ? "When I'm not helping clients, I enjoy sharing my knowledge through blog posts and creating educational content for aspiring entrepreneurs."
                    : "Quando não estou a ajudar clientes, gosto de partilhar o meu conhecimento através de artigos no blog e criar conteúdo educativo para empreendedores aspirantes."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer dict={dict?.footer} />
    </main>
  )
}
