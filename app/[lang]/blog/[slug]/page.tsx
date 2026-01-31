import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import {
  getPostBySlug,
  getImageUrl,
  getRelatedPostsByTags,
} from "@/lib/contentful"
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
  const lang = "pt"
  const post = await getPostBySlug(params.slug, lang)

  if (!post) {
    return {
      title: "Artigo não encontrado",
      description: "O artigo solicitado não existe.",
    }
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
        if (item.marks) {
          item.marks.forEach((mark: any) => {
            switch (mark.type) {
              case "bold":
                text = `<strong>${text}</strong>`
                break
              case "italic":
                text = `<em>${text}</em>`
                break
              case "underline":
                text = `<u>${text}</u>`
                break
            }
          })
        }
        return text
      } else if (item.nodeType === "hyperlink") {
        const url = item.data?.uri || "#"
        const linkText = processTextContent(item.content)
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-accent underline transition-colors">${linkText}</a>`
      }
      return ""
    })
    .join("")
}

function renderRichText(content: any): string {
  if (!content || !content.content) {
    return ""
  }

  return content.content
    .map((node: any) => {
      switch (node.nodeType) {
        case "paragraph":
          const text = processTextContent(node.content)
          return `<p class="mb-4 text-gray-700 leading-relaxed">${text}</p>`

        case "heading-1":
          const h1Text = processTextContent(node.content)
          return `<h1 class="text-3xl font-bold text-primary mb-6 mt-8">${h1Text}</h1>`

        case "heading-2":
          const h2Text = processTextContent(node.content)
          return `<h2 class="text-2xl font-bold text-primary mb-4 mt-6">${h2Text}</h2>`

        case "heading-3":
          const h3Text = processTextContent(node.content)
          return `<h3 class="text-xl font-bold text-primary mb-3 mt-5">${h3Text}</h3>`

        case "unordered-list":
          const listItems = node.content
            ?.map((listItem: any) => {
              const itemText = listItem.content
                ?.map((paragraph: any) => {
                  return processTextContent(paragraph.content)
                })
                .join("")
              return `<li class="mb-2">${itemText}</li>`
            })
            .join("")
          return `<ul class="list-disc list-inside mb-4 text-gray-700">${listItems}</ul>`

        case "ordered-list":
          const orderedItems = node.content
            ?.map((listItem: any) => {
              const itemText = listItem.content
                ?.map((paragraph: any) => {
                  return processTextContent(paragraph.content)
                })
                .join("")
              return `<li class="mb-2">${itemText}</li>`
            })
            .join("")
          return `<ol class="list-decimal list-inside mb-4 text-gray-700">${orderedItems}</ol>`

        case "blockquote":
          const quoteText = node.content
            ?.map((paragraph: any) => {
              return processTextContent(paragraph.content)
            })
            .join("")
          return `<blockquote class="border-l-4 border-accent pl-4 italic text-gray-600 mb-4">${quoteText}</blockquote>`

        case "hr":
          return `<hr class="my-8 border-gray-300" />`

        case "embedded-asset-block":
          // Handle embedded images
          if (node.data && node.data.target) {
            const asset = node.data.target
            if (asset.fields && asset.fields.file) {
              const imageUrl = asset.fields.file.url.startsWith("//")
                ? `https:${asset.fields.file.url}`
                : asset.fields.file.url
              const altText = asset.fields.title || asset.fields.description || "Embedded image"
              const width = asset.fields.file.details?.image?.width || 800
              const height = asset.fields.file.details?.image?.height || 600

              return `
                <div class="my-8 text-center">
                  <img 
                    src="${imageUrl}" 
                    alt="${altText}" 
                    class="max-w-full h-auto rounded-lg shadow-md mx-auto"
                    style="max-width: ${Math.min(width, 800)}px;"
                    loading="lazy"
                  />
                  ${asset.fields.description ? `<p class="text-sm text-gray-500 mt-2 italic">${asset.fields.description}</p>` : ""}
                </div>
              `
            }
          }
          return ""

        case "embedded-entry-block":
          // Handle embedded entries if needed
          return ""

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
  const dict = await getDictionary("pt")
  const post = await getPostBySlug(params.slug, "pt")

  if (!post) notFound()

  const isPortuguese = params.lang === "pt"

  /* -----------------------
     RELATED POSTS
  ----------------------- */
  const tagIds =
    post.metadata?.tags?.map((tag: any) => tag.sys.id) || []

  const relatedPosts =
    tagIds.length > 0
      ? await getRelatedPostsByTags(
          tagIds,
          "pt",
          post.fields.slug
        )
      : []

  const primaryTag =
  post.metadata?.tags?.[0]?.sys?.id || null

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Blog",
      item: `${BASE_URL}/${lang}/blog`,
    },
    ...(primaryTag
      ? [
          {
            "@type": "ListItem",
            position: 2,
            name: primaryTag.replace(/-/g, " "),
            item: `${BASE_URL}/${lang}/blog/tag/${primaryTag}`,
          },
        ]
      : []),
    {
      "@type": "ListItem",
      position: primaryTag ? 3 : 2,
      name: post.fields.title,
      item: `${BASE_URL}/${lang}/blog/${post.fields.slug}`,
    },
  ],
}

  /* -----------------------
     SCHEMA
  ----------------------- */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.fields.seoTitle || post.fields.title,
    description:
      post.fields.seoDescription || post.fields.description || "",
    image: post.fields.featuredImage
      ? [getImageUrl(post.fields.featuredImage)]
      : undefined,
    datePublished: post.fields.publishedDate,
    dateModified: post.sys?.updatedAt || post.fields.publishedDate,
    author: {
      "@type": "Person",
      name: post.fields.author?.fields?.name || "Alexandra Ribeiro",
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Alexandra Ribeiro",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/av-20favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${lang}/blog/${post.fields.slug}`,
    },
  }

 

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader dict={dict} />

      {/* Schema.org - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      {/* Schema.org – Breadcrumbs */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>

      <div className="container py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
          
          {/* ARTICLE */}
          
          <article className="lg:col-span-3">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
  <ol className="flex flex-wrap items-center gap-2">
    <li>
      <Link href={`/${lang}`} className="hover:text-primary">
        {isPortuguese ? "Início" : "Home"}
      </Link>
    </li>
    <li>/</li>
    <li>
      <Link href={`/${lang}/blog`} className="hover:text-primary">
        Blog
      </Link>
    </li>
    <li>/</li>
    <li className="text-gray-700 font-medium truncate">
      {post.fields.title}
    </li>
  </ol>
</nav>

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
                {post.fields.publishedDate && (
                  <p className="text-sm text-accent mb-4">
                    {formatDate(post.fields.publishedDate, params.lang)}
                  </p>
                )}

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {post.fields.title}
                </h1>

                <p className="text-xl text-gray-600">
                  {post.fields.description}
                </p>
{/* TAGS */}
{post.metadata?.tags?.length > 0 && (
  <div className="mt-6 flex flex-wrap gap-2">
    {post.metadata.tags.map((tag) => (
      <Link
        key={tag.sys.id}
        href={`/${params.lang}/blog/tag/${tag.sys.id}`}
        className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-accent hover:text-white transition"
      >
        #{tag.sys.id.replace(/-/g, " ")}
      </Link>
    ))}
  </div>
)}
                
              </div>

              <div className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderRichText(post.fields.content),
                  }}
                />
              </div>

              {/* RELATED POSTS */}
              {relatedPosts.length > 0 && (
                <section className="mt-20 border-t pt-12">
                  <h2 className="text-2xl font-bold mb-6">
                    {isPortuguese
                      ? "Artigos relacionados"
                      : "Related articles"}
                  </h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.sys.id}
                        href={`/${params.lang}/blog/${related.fields.slug}`}
                        className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                      >
                        {related.fields.featuredImage && (
                          <div className="relative h-40 w-full">
                            <Image
                              src={getImageUrl(
                                related.fields.featuredImage
                              )}
                              alt={related.fields.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}

                        <div className="p-4">
                          <h3 className="font-semibold mb-2">
                            {related.fields.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {related.fields.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-16">
                <Link
                  href={`/${lang}/blog`}
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

              <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                  {isPortuguese ? (
                    <>
                      <p>
                        Olá 👋 Sou Alexandra Ribeiro, consultora digital com mais de 20 anos de experiência em
                        tecnologia, Engenharia Informática e gestão de projetos. Hoje ajudo empreendedores e freelancers
                        em Portugal a dar os primeiros passos no digital sem complicações técnicas.
                      </p>
                      <p>
                        No meu blog encontras dicas práticas sobre domínios, websites, lojas online e automação.
                        Acredito que todos podem criar uma presença digital profissional — mesmo sem conhecimentos
                        técnicos.
                      </p>
                      <p>👉 Se estás a começar e precisas de orientação simples, estás no sítio certo!</p>
                    </>
                  ) : (
                    <>
                      <p>
                        Hello 👋 I'm Alexandra Ribeiro, a digital consultant with over 20 years of experience in
                        technology, Computer Engineering and project management. Today I help entrepreneurs and
                        freelancers in Portugal take their first steps in digital without technical complications.
                      </p>
                      <p>
                        In my blog you'll find practical tips about domains, websites, online stores and automation. I
                        believe everyone can create a professional digital presence — even without technical knowledge.
                      </p>
                      <p>👉 If you're starting out and need simple guidance, you're in the right place!</p>
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
