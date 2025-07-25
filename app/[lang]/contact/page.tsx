import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContactPageProps {
  params: { lang: "pt" | "en" }
}

export default async function ContactPage({ params: { lang } }: ContactPageProps) {
  let dict

  try {
    dict = await getDictionary(lang)
  } catch (error) {
    console.error("Error loading dictionary:", error)
    dict = {
      footer: {},
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Email",
      content: "info@alexandraribeiro.pt",
      link: "mailto:info@alexandraribeiro.pt",
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: lang === "en" ? "Phone" : "Telefone",
      content: "+351 123 456 789",
      link: "tel:+351123456789",
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: lang === "en" ? "Location" : "Localização",
      content: "Portugal",
      link: null,
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: lang === "en" ? "Business Hours" : "Horário de Funcionamento",
      content: lang === "en" ? "Mon-Fri: 9AM-6PM" : "Seg-Sex: 9h-18h",
      link: null,
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
              {lang === "en" ? "Contact Me" : "Contactar"}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {lang === "en"
                ? "Ready to take your business to the next level? Let's discuss how I can help you achieve your goals."
                : "Pronto para levar o seu negócio para o próximo nível? Vamos discutir como posso ajudá-lo a alcançar os seus objetivos."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {lang === "en" ? "Send a Message" : "Enviar Mensagem"}
              </h2>
              <ContactForm lang={lang} />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {lang === "en" ? "Get in Touch" : "Entre em Contacto"}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3 text-lg">
                        {info.icon}
                        <span>{info.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {info.link ? (
                        <a href={info.link} className="text-gray-600 hover:text-blue-600 transition-colors">
                          {info.content}
                        </a>
                      ) : (
                        <span className="text-gray-600">{info.content}</span>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {lang === "en" ? "Why Choose Me?" : "Porquê Escolher-me?"}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      {lang === "en"
                        ? "Personalized solutions tailored to your business needs"
                        : "Soluções personalizadas adaptadas às necessidades do seu negócio"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      {lang === "en"
                        ? "5+ years of experience in digital consulting"
                        : "Mais de 5 anos de experiência em consultoria digital"}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{lang === "en" ? "Ongoing support and maintenance" : "Suporte e manutenção contínuos"}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      {lang === "en"
                        ? "Transparent communication and regular updates"
                        : "Comunicação transparente e atualizações regulares"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer dict={dict?.footer} />
    </main>
  )
}
