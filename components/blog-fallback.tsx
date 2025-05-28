import Link from "next/link"

interface BlogFallbackProps {
  lang: string
  message?: string
}

export default function BlogFallback({ lang, message }: BlogFallbackProps) {
  return (
    <div className="py-16 text-center">
      <h2 className="text-2xl font-bold text-primary mb-4">
        {lang === "en" ? "Blog Posts Coming Soon" : "Artigos em Breve"}
      </h2>
      {message && <p className="text-gray-600 mb-6">{message}</p>}
      <p className="text-gray-600 mb-6">
        {lang === "en"
          ? "We're working on bringing you great content. Check back soon!"
          : "Estamos trabalhando para trazer ótimo conteúdo. Volte em breve!"}
      </p>
      <Link href={`/${lang}`} className="inline-flex items-center text-primary hover:text-accent transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>{lang === "en" ? "Back to Home" : "Voltar para a Página Inicial"}</span>
      </Link>
    </div>
  )
}
