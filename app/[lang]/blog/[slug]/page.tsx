import { getDictionary } from "@/lib/dictionaries"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { getBlogPosts, type BlogPost, getImageUrl } from "@/lib/contentful"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

const BASE_URL = "https://www.alexandraribeiro.pt"

/* ---------------------------
   METADATA (SEO + OG)
---------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata> {
  const lang = params.lang === "en" ? "en" : "pt"

  const posts = await getBlogPosts(lang)
  const post = posts.find((p) => p.fields.slug === params.slug)

  if (!post) {
    return {}
  }

  const title = post.fields.seoTitle || post.fields.title
  const description =
    post.fields.seoDescription ||
    post.fields.description ||
    ""

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

/* ---------------------------
   PAGE
---------------------------- */
export default async function BlogPostPage({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const dict = await getDictionary(params.lang)

  const posts = await getBlogPosts(params.lang)
  const post = posts.find((p) => p.fields.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader dict={dict} />

      <article className="container py-16 md:py-24 max-w-4xl mx-auto">
        {/* Featured Image */}
        {post.fields.featuredImage && (
          <div className="relative w-full h-[400px] mb-10 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(post.fields.featuredImage)}
              alt={post.fields.title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        )}

        {/* Meta */}
        <p className="text-accent text-sm mb-4">
          {post.fields.publishedDate
            ? formatDate(post.fields.publishedDate, params.lang)
            : ""}
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          {post.fields.title}
        </h1>

        {/* Description / Intro */}
        {post.fields.description && (
          <p className="text-lg text-gray-600 mb-10">
            {post.fields.description}
          </p>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.fields.content && (
  <article className="prose prose-lg max-w-none mt-8">
    {documentToReactComponents(post.fields.content)}
  </article>
)}
        </div>

        {/* Back to blog */}
        <div className="mt-16">
          <Link
            href={`/${params.lang}/blog`}
            className="text-primary hover:text-accent transition-colors"
          >
            ← {params.lang === "en" ? "Back to blog" : "Voltar ao blog"}
          </Link>
        </div>
      </article>

      <Footer dict={dict.footer} />
    </main>
  )
}
