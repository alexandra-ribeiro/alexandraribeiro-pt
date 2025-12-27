import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"

import {
  getPostsByTag,
  getImageUrl,
  type BlogPost,
} from "@/lib/contentful"

const BASE_URL = "https://www.alexandraribeiro.pt"

/* ======================================================
   SEO / METADATA
====================================================== */
export async function generateMetadata({
  params,
}: {
  params: { lang: string; tag: string }
}): Promise<Metadata> {
  const lang = params.lang === "en" ? "en" : "pt"
  const tagName = decodeURIComponent(params.tag)

  const title =
    lang === "pt"
      ? `${tagName} – Artigos e guias práticos | Blog Alexandra Ribeiro`
      : `${tagName} – Articles & practical guides | Alexandra Ribeiro Blog`

  const description =
    lang === "pt"
      ? `Artigos, guias e recursos sobre ${tagName} para empreendedores e negócios digitais em Portugal.`
      : `Articles, guides and resources about ${tagName} for digital entrepreneurs.`

  const canonicalUrl = `${BASE_URL}/${lang}/blog/tag/${params.tag}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        pt: `${BASE_URL}/pt/blog/tag/${params.tag}`,
        en: `${BASE_URL}/en/blog/tag/${params.tag}`,
        "x-default": `${BASE_URL}/pt/blog/tag/${params.tag}`,
      },
    },
  }
}

/* ======================================================
   PAGE
====================================================== */
export default async function BlogTagPage({
  params,
}: {
  params: { lang: string; tag: string }
}) {
  const dict = await getDictionary(params.lang)

  const tagId = params.tag
  const tagLabel = decodeURIComponent(params.tag)

  const posts = await getPostsByTag(tagId, params.lang)

  if (!posts.length) notFound()

  const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Blog",
      item: `https://www.alexandraribeiro.pt/${params.lang}/blog`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: tagName,
      item: `https://www.alexandraribeiro.pt/${params.lang}/blog/tag/${params.tag}`,
    },
  ],
}

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader dict={dict} />
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
/>

      <div className="container py-16 md:py-24 max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {params.lang === "pt"
              ? `Artigos sobre ${tagLabel}`
              : `Articles about ${tagLabel}`}
          </h1>
          <p className="text-lg text-gray-600">
            {params.lang === "pt"
              ? `Conteúdos práticos relacionados com ${tagLabel}.`
              : `Practical content related to ${tagLabel}.`}
          </p>
        </header>

        {/* LISTA DE ARTIGOS */}
        <section className="grid gap-10">
          {posts.map((post: BlogPost) => (
            <article
              key={post.sys.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {post.fields.featuredImage && (
                <div className="relative h-56 w-full">
                  <Image
                    src={getImageUrl(post.fields.featuredImage)}
                    alt={post.fields.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    href={`/${params.lang}/blog/${post.fields.slug}`}
                    className="hover:text-accent"
                  >
                    {post.fields.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-4">
                  {post.fields.description}
                </p>

                <Link
                  href={`/${params.lang}/blog/${post.fields.slug}`}
                  className="text-primary font-medium"
                >
                  {params.lang === "pt" ? "Ler artigo →" : "Read article →"}
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>

      <Footer dict={dict.footer} />
    </main>
  )
}
