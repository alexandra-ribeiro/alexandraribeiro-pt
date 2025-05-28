import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BlogArticleProps {
  title: string
  date: string
  image: string
  content: string
  lang: string
}

export default function BlogArticle({ title, date, image, content, lang }: BlogArticleProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center text-primary hover:text-accent transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>{lang === "en" ? "Back to all articles" : "Voltar para todos os artigos"}</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-[400px] w-full">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>

        <div className="p-8">
          <div className="mb-6">
            <p className="text-accent text-sm font-medium mb-2">{date}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            {content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
