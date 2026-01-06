import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { getBlogPosts, type BlogPost, getImageUrl } from "@/lib/contentful"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const lang = params.lang === "en" ? "en" : "pt"

  const baseUrl = "https://www.alexandraribeiro.pt"

  const titles = {
    pt: "Blog | Alexandra Ribeiro | Consultora Digital",
    en: "Blog | Alexandra Ribeiro | Digital Consultant",
  }

  const descriptions = {
    pt: "Descubra dicas, guias e recursos práticos sobre tecnologia, assistência virtual e consultoria digital para empreendedores.",
    en: "Discover tips, guides and practical resources on technology, virtual assistance and digital consulting for entrepreneurs.",
  }

  return {
    title: titles[lang],
    description: descriptions[lang],

    alternates: {
      canonical: `${baseUrl}/${lang}/blog`,
      languages: {
        pt: `${baseUrl}/pt/blog`,
        en: `${baseUrl}/en/blog`,
        "x-default": `${baseUrl}/pt/blog`,
      },
    },
  }
}

export default async function BlogPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  // Fetch blog posts with proper error handling
  let posts: BlogPost[] = []
  try {
    console.log(params.lang)
    posts = await getBlogPosts(params.lang)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    // Continue with empty posts array instead of failing
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader dict={dict} />

      <section className="container py-16 md:py-24">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">{params.lang === "en" ? "Blog" : "Blog"}</h1>
          <p className="text-lg text-gray-600">
            {params.lang === "en"
              ? "Discover the latest insights, tips, and resources for virtual assistance."
              : "Descubra as últimas novidades, dicas e recursos para assistência virtual."}
          </p>
          <div className="h-1 w-20 bg-accent mx-auto mt-8"></div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {params.lang === "en" ? "New articles coming soon. Stay tuned!" : "Novos artigos em breve. Fique ligado!"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.sys.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/${params.lang}/blog/${post.fields.slug}`}>
                  <div className="relative h-48 w-full">
                    {post.fields.featuredImage ? (
                      <Image
                        src={getImageUrl(post.fields.featuredImage) || "/placeholder.svg"}
                        alt={post.fields.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <p className="text-accent text-sm font-medium mb-2">
                    {post.fields.publishedDate ? formatDate(post.fields.publishedDate, params.lang) : ""}
                  </p>
                  <Link href={`/${params.lang}/blog/${post.fields.slug}`}>
                    <h2 className="text-xl font-bold mb-3 text-primary hover:text-accent transition-colors">
                      {post.fields.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.fields.description}</p>
                  <Link
                    href={`/${params.lang}/blog/${post.fields.slug}`}
                    className="inline-flex items-center text-primary hover:text-accent transition-colors"
                  >
                    {params.lang === "en" ? "Read more" : "Ler mais"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer dict={dict.footer} />
    </main>
  )
}
