import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { getPostBySlug, getImageUrl } from "@/lib/contentful"
import { formatDate } from "@/lib/utils"

const BASE_URL = "https://www.alexandraribeiro.pt"

/* ======================================================
   SEO / METADATA
====================================================== */
export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string }
}): Promise<Metadata> {
  const lang = params.lang === "en" ? "en" : "pt"
  const post = await getPostBySlug(params.slug, lang)

  if (!post) {
    return {
      title: "Artigo não encontrado",
      description: "O artigo solicitado não existe.",
    }
  }

   const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.fields.seoTitle || post.fields.title,
  description: post.fields.seoDescription || post.fields.description,
  image: post.fields.featuredImage
    ? [getImageUrl(post.fields.featuredImage)]
    : undefined,
  datePublished: post.fields.publishedDate,
  dateModified: post.sys?.updatedAt || post.fields.publishedDate,
  author: {
    "@type": "Person",
    name: post.fields.author?.fields?.name || "Alexandra Ribeiro",
    url: "https://www.alexandraribeiro.pt/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Alexandra Ribeiro",
    logo: {
      "@type": "ImageObject",
      url: "https://www.alexandraribeiro.pt/images/av-20favicon.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}/${params.lang}/blog/${post.fields.slug}`,
  },
}

  const title = post.fields.seoTitle || post.fields.title
  const description =
    post.fields.seoDescription || post.fields.description || ""

  const canonicalUrl = `${BASE_URL}/${lang}/blog/${post.fields.slug}`
  const imageUrl = post.fields.featuredImage
    ? getImageUrl(post.fields.featuredImage)
    : undefined

  return {
    title: `${title} | Alexandra Ribeiro`,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        pt: `${BASE_URL}/pt/blog/${post.fields.slug}`,
        en: `${BASE_URL}/en/blog/${post.fields.slug}`,
        "x-default": `${BASE_URL}/pt/blog/${post.fields.slug}`,
      },
    },

    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.fields.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

/* ======================================================
   RICH TEXT RENDERING (INALTERADO)
====================================================== */
function processTextContent(content: any[]): string {
  if (!content) return ""

  return content
    .map((item: any) => {
      if (item.nodeType === "text") {
        let text = item.value
        item.marks?.forEach((mark: any) => {
          if (mark.type === "bold") text = `<strong>${text}</strong>`
          if (mark.type === "italic") text = `<em>${text}</em>`
          if (mark.type === "underline") text = `<u>${text}</u>`
        })
        return text
      }

      if (item.nodeType === "hyperlink") {
        const url = item.data?.uri || "#"
        const linkText = processTextContent(item.content)
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${linkText}</a>`
      }

      return ""
    })
    .join("")
}

function renderRichText(content: any): string {
  if (!content?.content) return ""

  return content.content
    .map((node: any) => {
      switch (node.nodeType) {
        case "paragraph":
          return `<p class="mb-4">${processTextContent(node.content)}</p>`

        case "heading-2":
          return `<h2 class="text-2xl font-bold mt-8 mb-4">${processTextContent(node.content)}</h2>`

        case "heading-3":
          return `<h3 class="text-xl font-bold mt-6 mb-3">${processTextContent(node.content)}</h3>`

        case "unordered-list":
          return `<ul class="list-disc list-inside mb-4">${node.content
            .map((li: any) => `<li>${processTextContent(li.content[0].content)}</li>`)
            .join("")}</ul>`

        case "ordered-list":
          return `<ol class="list-decimal list-inside mb-4">${node.content
            .map((li: any) => `<li>${processTextContent(li.content[0].content)}</li>`)
            .join("")}</ol>`

        case "blockquote":
          return `<blockquote class="border-l-4 pl-4 italic my-6">${processTextContent(
            node.content[0].content
          )}</blockquote>`
case "embedded-asset-block": {
  const file = node.data?.target?.fields?.file
  const title = node.data?.target?.fields?.title || ""

  if (!file?.url) return ""

  const imageUrl = file.url.startsWith("//")
    ? `https:${file.url}`
    : file.url

  return `
    <figure class="my-8">
      <img
        src="${imageUrl}"
        alt="${title}"
        class="rounded-lg shadow-md mx-auto"
      />
      ${
        title
          ? `<figcaption class="text-sm text-gray-500 text-center mt-2">${title}</figcaption>`
          : ""
      }
    </figure>
  `
}

        default:
          return ""
      }
    })
    .join("")
}

/* ======================================================
   PAGE
====================================================== */
export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string; lang: string }
}) {
  const dict = await getDictionary(params.lang)
  const post = await getPostBySlug(params.slug, params.lang)

  if (!post) notFound()

  const isPortuguese = params.lang === "pt"

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader dict={dict} />
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema),
  }}
/>

      <div className="container py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
          {/* ARTICLE */}
          <article className="lg:col-span-3">
            <div className="max-w-4xl">
              {post.fields.featuredImage && (
                <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
                  <Image
                    src={getImageUrl(post.fields.featuredImage)}
                    alt={post.fields.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              )}

              <div className="mb-12">
                <div className="flex items-center text-sm text-accent mb-4">
                  {post.fields.publishedDate && (
                    <span className="mr-4">
                      {formatDate(post.fields.publishedDate, params.lang)}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {post.fields.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {post.fields.description}
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderRichText(post.fields.content),
                  }}
                />
              </div>

              <div className="mt-16 pt-8 border-t">
                <Link
                  href={`/${params.lang}/blog`}
                  className="text-primary hover:text-accent"
                >
                  ← {isPortuguese ? "Voltar ao blog" : "Back to blog"}
                </Link>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/images/alexandra-photo.jpeg"
                    alt="Alexandra Ribeiro"
                    fill
                    className="rounded-full object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-bold">
                  {isPortuguese ? "Quem sou eu?" : "Who am I?"}
                </h3>
              </div>

              <div className="text-sm text-gray-700 space-y-3">
                {isPortuguese ? (
                  <>
                    <p>Sou Alexandra Ribeiro, consultora digital com +20 anos de experiência.</p>
                    <p>No blog partilho dicas práticas para empreendedores em Portugal.</p>
                  </>
                ) : (
                  <>
                    <p>I'm Alexandra Ribeiro, a digital consultant with 20+ years of experience.</p>
                    <p>I help entrepreneurs build their digital presence with confidence.</p>
                  </>
                )}
              </div>

              <div className="mt-6 pt-4 border-t">
                <Link
                  href={`/${params.lang}/about`}
                  className="text-primary text-sm font-medium"
                >
                  {isPortuguese ? "Saber mais sobre mim" : "Learn more about me"} →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer dict={dict.footer} />
    </main>
  )
}
