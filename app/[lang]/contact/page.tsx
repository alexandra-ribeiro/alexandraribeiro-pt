import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import ContactForm from "@/components/contact-form"
import CalendarEmbed from "@/components/calendar-embed"
import Footer from "@/components/footer"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const lang = params.lang === "en" ? "en" : "pt"

  const baseUrl = "https://www.alexandraribeiro.pt"

  return {
    title: `${dict.contact.title} | ${dict.metadata.title}`,
    description: dict.contact.description,

    alternates: {
      canonical: `${baseUrl}/${lang}/contact`,
      languages: {
        pt: `${baseUrl}/pt/contact`,
        en: `${baseUrl}/en/contact`,
        "x-default": `${baseUrl}/pt/contact`,
      },
    },
  }
}

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)
  const email = "geral@alexandraribeiro.pt"
  const calendlyUrl = "https://calendly.com/geral-alexandraribeiro-av/discovery-call-15min"

  // Custom subtitle text with response time guarantee
  const customSubtitle =
    params.lang === "pt"
      ? "Tem questões ou está pronto para começar? Preencha o formulário abaixo (garantia de resposta dentro das próximas 24h) ou agende diretamente uma chamada de 15 minutos."
      : "Have questions or ready to start? Fill out the form below (guaranteed response within the next 24h) or schedule a 15-minute call directly."

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <SiteHeader dict={dict} />

      <div className="container py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">{dict.contact.title}</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">{customSubtitle}</p>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto relative">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6 text-primary">{dict.contact.formTitle}</h2>
            <ContactForm dict={dict.contact} />
          </div>

          {/* OR separator */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-white rounded-full p-4 shadow-md">
              <span className="text-customGold font-bold text-xl">{params.lang === "en" ? "OR" : "OU"}</span>
            </div>
          </div>

          {/* Mobile OR separator */}
          <div className="md:hidden flex justify-center my-4">
            <div className="bg-white rounded-full p-3 shadow-md">
              <span className="text-customGold font-bold text-lg">{params.lang === "en" ? "OR" : "OU"}</span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6 text-primary">{dict.contact.calendarTitle}</h2>
            <CalendarEmbed dict={dict.contact} calendlyUrl={calendlyUrl} />
          </div>
        </div>
      </div>

      <Footer dict={dict.footer} />
    </main>
  )
}
