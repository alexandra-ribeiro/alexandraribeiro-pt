import Link from "next/link"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { getPostBySlug, getImageUrl } from "@/lib/contentful"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata> {
  const lang = params.lang === "en" ? "en" : "pt"
  const baseUrl = "https://www.alexandraribeiro.pt"

  const post = await getPostBySlug(params.slug, lang)

  if (!post) {
    return {}
  }

  const title = post.fields.title
  const description = post.fields.description
  const imageUrl = post.fields.featuredImage
    ? getImageUrl(post.fields.featuredImage)
    : undefined

  return {
    title,
    description,

    alternates: {
      canonical: `${baseUrl}/${lang}/blog/${params.slug}`,
      languages: {
        pt: `${baseUrl}/pt/blog/${params.slug}`,
        en: `${baseUrl}/en/blog/${params.slug}`,
        "x-default": `${baseUrl}/pt/blog/${params.slug}`,
      },
    },

    openGraph: {
      type: "article",
      locale: lang === "pt" ? "pt_PT" : "en_US",
      url: `${baseUrl}/${lang}/blog/${params.slug}`,
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      publishedTime: post.fields.publishedDate,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

// Function to process text nodes with formatting and hyperlinks
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

// Function to render rich text content from Contentful
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

export default async function BlogArticlePage({ params }: { params: { slug: string; lang: string } }) {
  const dict = await getDictionary(params.lang)

  // Fetch the blog post with proper error handling
  let post = null
  try {
    post = await getPostBySlug(params.slug)
  } catch (error) {
    console.error("Error fetching blog post:", error)
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50">
        <SiteHeader dict={dict} />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">
            {params.lang === "en" ? "Post Not Found" : "Artigo Não Encontrado"}
          </h1>
          <p className="mb-8">
            {params.lang === "en"
              ? "The blog post you are looking for does not exist or has been removed."
              : "O artigo que você está procurando não existe ou foi removido."}
          </p>
          <Link
            href={`/${params.lang}/blog`}
            className="inline-flex items-center text-primary hover:text-accent transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{params.lang === "en" ? "Back to all articles" : "Voltar para todos os artigos"}</span>
          </Link>
        </div>
        <Footer dict={dict.footer} />
      </main>
    )
  }

  const isPortuguese = params.lang === "pt"

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader dict={dict} />

      <div className="container py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Article Content */}
            <article className="lg:col-span-3">
              <div className="max-w-4xl">
                {/* Featured Image */}
                {post.fields.featuredImage && (
                  <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
                    <Image
                      src={getImageUrl(post.fields.featuredImage) || "/placeholder.svg"}
                      alt={post.fields.title}
                      fill
                      className="object-cover"
                      unoptimized
                      priority
                    />
                  </div>
                )}

                {/* Article Header */}
                <div className="mb-12">
                  <div className="flex items-center text-sm text-accent mb-4">
                    <span className="mr-4">
                      {post.fields.publishedDate ? formatDate(post.fields.publishedDate, params.lang) : ""}
                    </span>
                    {post.fields.author && post.fields.author.fields && (
                      <span className="flex items-center">
                        {post.fields.author.fields.picture && (
                          <Image
                            src={getImageUrl(post.fields.author.fields.picture) || "/placeholder.svg"}
                            alt={post.fields.author.fields.name}
                            width={24}
                            height={24}
                            className="rounded-full mr-2"
                            unoptimized
                          />
                        )}
                        {post.fields.author.fields.name}
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">{post.fields.title}</h1>
                  <p className="text-xl text-gray-600">{post.fields.description}</p>
                </div>

                {/* Article Content - Rich Text */}
                <div className="prose prose-lg max-w-none">
                  {post.fields.content ? (
                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: renderRichText(post.fields.content),
                      }}
                    />
                  ) : (
                    <p className="text-gray-500">
                      {params.lang === "en" ? "No content available." : "Conteúdo não disponível."}
                    </p>
                  )}
                </div>

                {/* Back to Blog */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                  <Link
                    href={`/${params.lang}/blog`}
                    className="inline-flex items-center text-primary hover:text-accent transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    {params.lang === "en" ? "Back to all articles" : "Voltar para todos os artigos"}
                  </Link>
                </div>
              </div>
            </article>

            {/* Author Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src="/images/alexandra-photo.jpeg"
                      alt="Alexandra Ribeiro"
                      fill
                      className="object-cover rounded-full"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{isPortuguese ? "Quem sou eu?" : "Who am I?"}</h3>
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

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link
                    href={`/${params.lang}/about`}
                    className="inline-flex items-center text-primary hover:text-accent transition-colors text-sm font-medium"
                  >
                    {isPortuguese ? "Saber mais sobre mim" : "Learn more about me"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer dict={dict.footer} />
    </main>
  )
}
