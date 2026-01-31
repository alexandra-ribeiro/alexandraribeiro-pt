
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"

import {
  getPostBySlug,
  getImageUrl,
  getRelatedPostsByTags,
} from "@/lib/contentful"

import { formatDate } from "@/lib/utils"

const BASE_URL = "https://www.alexandraribeiro.pt"
const LANG = "pt"

/* ======================================================
   METADATA (SEM FETCH)
====================================================== */
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const canonicalUrl = `${BASE_URL}/pt/blog/${params.slug}`

  return {
    title: "Blog | Alexandra Ribeiro",
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

/* ======================================================
   RICH TEXT
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
          return `<h2 class="text-2xl font-bold my-6">${processTextContent(node.content)}</h2>`

        case "unordered-list":
          return `<ul class="list-disc list-inside mb-6">${node.content
            .map((li: any) =>
              `<li>${processTextContent(li.content[0].content)}</li>`
            )
            .join("")}</ul>`

        case "embedded-asset-block": {
          const asset = node.data?.target
          if (!asset?.fields?.file) return ""
          const imgUrl = asset.fields.file.url.startsWith("//")
            ? `https:${asset.fields.file.url}`
            : asset.fields.file.url

          return `
            <div class="my-10 text-center">
              <img src="${imgUrl}" alt="${asset.fields.title || ""}" class="mx-auto rounded-lg shadow" />
            </div>
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
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug, LANG)
  if (!post) notFound()

  const tagIds =
    post.metadata?.tags?.map((tag: any) => tag.sys.id) || []

  const relatedPosts =
    tagIds.length > 0
      ? await getRelatedPostsByTags(tagIds, LANG, post.fields.slug)
      : []

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.fields.title,
    description: post.fields.description || "",
    image: post.fields.featuredImage
      ? [getImageUrl(post.fields.featuredImage)]
      : undefined,
    datePublished: post.fields.publishedDate,
    dateModified: post.sys?.updatedAt,
    author: {
      "@type": "Person",
      name: "Alexandra Ribeiro",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/pt/blog/${post.fields.slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="container py-20 max-w-4xl">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/pt">Início</Link> /{" "}
          <Link href="/pt/blog">Blog</Link>
        </nav>

        {post.fields.featuredImage && (
          <div className="relative h-[420px] mb-10 rounded-xl overflow-hidden">
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

        <p className="text-sm text-accent mb-4">
          {formatDate(post.fields.publishedDate, "pt")}
        </p>

        <h1 className="text-4xl font-bold mb-6">
          {post.fields.title}
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          {post.fields.description}
        </p>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: renderRichText(post.fields.content),
          }}
        />

        {relatedPosts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-6">
              Artigos relacionados
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.sys.id}
                  href={`/pt/blog/${rel.fields.slug}`}
                  className="block bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="p-4">
                    <h3 className="font-semibold">
                      {rel.fields.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16">
          <Link href="/pt/blog" className="text-primary">
            ← Voltar ao blog
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
