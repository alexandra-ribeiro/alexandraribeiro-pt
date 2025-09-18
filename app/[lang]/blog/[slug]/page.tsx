import Link from "next/link"
import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { getPostBySlug, getImageUrl } from "@/lib/contentful"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

export async function generateMetadata({ params }: { params: { slug: string; lang: string } }) {
  try {
    const post = await getPostBySlug(params.slug)

    if (!post) {
      return {
        title: "Article Not Found",
        description: "The requested article could not be found.",
      }
    }

    return {
      title: `${post.fields.title} | Virtual Assistant Blog`,
      description: post.fields.description,
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Blog Article | Virtual Assistant",
      description: "Read our latest blog article.",
    }
  }
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
          const text = node.content
            ?.map((textNode: any) => {
              if (textNode.nodeType === "text") {
                let text = textNode.value
                if (textNode.marks) {
                  textNode.marks.forEach((mark: any) => {
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
              }
              return ""
            })
            .join("")
          return `<p class="mb-4 text-gray-700 leading-relaxed">${text}</p>`

        case "heading-1":
          const h1Text = node.content?.map((textNode: any) => textNode.value).join("") || ""
          return `<h1 class="text-3xl font-bold text-primary mb-6 mt-8">${h1Text}</h1>`

        case "heading-2":
          const h2Text = node.content?.map((textNode: any) => textNode.value).join("") || ""
          return `<h2 class="text-2xl font-bold text-primary mb-4 mt-6">${h2Text}</h2>`

        case "heading-3":
          const h3Text = node.content?.map((textNode: any) => textNode.value).join("") || ""
          return `<h3 class="text-xl font-bold text-primary mb-3 mt-5">${h3Text}</h3>`

        case "unordered-list":
          const listItems = node.content
            ?.map((listItem: any) => {
              const itemText = listItem.content
                ?.map((paragraph: any) => {
                  return paragraph.content?.map((textNode: any) => textNode.value).join("") || ""
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
                  return paragraph.content?.map((textNode: any) => textNode.value).join("") || ""
                })
                .join("")
              return `<li class="mb-2">${itemText}</li>`
            })
            .join("")
          return `<ol class="list-decimal list-inside mb-4 text-gray-700">${orderedItems}</ol>`

        case "blockquote":
          const quoteText = node.content
            ?.map((paragraph: any) => {
              return paragraph.content?.map((textNode: any) => textNode.value).join("") || ""
            })
            .join("")
          return `<blockquote class="border-l-4 border-accent pl-4 italic text-gray-600 mb-4">${quoteText}</blockquote>`

        case "hr":
          return `<hr class="my-8 border-gray-300" />`

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

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader dict={dict} />

      <article className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {params.lang === "en" ? "Back to all articles" : "Voltar para todos os artigos"}
            </Link>
          </div>
        </div>
      </article>

      <Footer dict={dict.footer} />
    </main>
  )
}
