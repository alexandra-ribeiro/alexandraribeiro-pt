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

  // Simple content rendering function that handles basic HTML
  const renderContent = () => {
    if (!post || !post.fields.content) return null

    // For now, just return a simple div with the content as HTML
    // This avoids potential issues with the rich text renderer
    return (
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.fields.content.content
            ? post.fields.content.content
                .map((item: any) => {
                  if (item.nodeType === "paragraph") {
                    return `<p>${item.content.map((c: any) => c.value).join("")}</p>`
                  }
                  return ""
                })
                .join("")
            : "No content available",
        }}
      />
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

          {/* Article Content - Simple Version */}
          <div className="prose prose-lg max-w-none">
            {post.fields.content ? (
              <div className="text-gray-700 leading-relaxed">
                <p>{post.fields.description}</p>
                {/* More content would be rendered here */}
              </div>
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
