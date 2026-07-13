import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import CalendarEmbed from "@/components/calendar-embed"
import Footer from "@/components/footer"
import { Mail, MapPin, Clock } from "lucide-react"

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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <SiteHeader dict={dict} />

      <div className="container py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">{dict.contact.title}</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">{dict.contact.subtitle}</p>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-primary text-center">{dict.contact.calendarTitle}</h2>
          <CalendarEmbed dict={dict.contact} calendlyUrl={calendlyUrl} />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center">
              <Clock className="h-5 w-5 text-accent mb-2" />
              <p className="text-sm font-medium text-primary">{dict.contact.calendar.duration}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{dict.contact.calendar.durationValue}</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center">
              <Mail className="h-5 w-5 text-accent mb-2" />
              <p className="text-sm font-medium text-primary">{dict.contact.email}</p>
              <a href={`mailto:${email}`} className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
                {email}
              </a>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center">
              <MapPin className="h-5 w-5 text-accent mb-2" />
              <p className="text-sm font-medium text-primary">{dict.contact.location}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{dict.contact.locationValue}</p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">{dict.contact.response}</p>
        </div>
      </div>

      <Footer dict={dict.footer} />
    </main>
  )
}
