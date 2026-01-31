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
const CONTENT_LANG = "pt" // 👈 BLOG SEMPRE EM PORTUGUÊS

/* ======================================================
   SEO / METADATA
====================================================== */
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, CONTENT_LANG)

  if (!post) {
    return {
      title: "Artigo não encontrado",
      description: "O artigo solicitado não existe.",
    }
  }

  const title = post.fields.seoTitle || post.fields.title
  const description =
    post.fields.seoDescription || post.fields.description || ""

  const canonicalUrl = `${BASE_URL}/pt/blog/${post.fields.slug}`

  const imageUrl = post.fields.featuredImage
    ? getImageUrl(post.fields.featuredImage)
    : undefined

  return {
    title: `${title} | Alexandra Ribeiro`,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        pt: canonicalUrl,
        en: canonicalUrl, // EN aponta para PT (conteúdo único)
        "x-default": canonicalUrl,
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
   PAGE
====================================================== */
export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  // UI em PT (blog é sempre PT)
  const dict = await getDictionary("pt")

  // Conteúdo SEMPRE em PT
  const post = await getPostBySlug(params.slug, CONTENT_LANG)
  if (!post) notFound()

  /* -----------------------
     RELATED POSTS (PT)
  ----------------------- */
  const tagIds =
    post.metadata?.tags?.map((tag: any) => tag.sys.id) || []

  const relatedPosts =
    tagIds.length > 0
      ? await getRelatedPostsByTags(
          tagIds,
          CONTENT_LANG,
          post.fields.slug
        )
      : []

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
      "@id": `${BASE_URL}/pt/blog/${post.fields.slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader dict={dict} />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <div className="container py-16 md:py-24">
        <article className="max-w-4xl mx-auto">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/pt/blog" className="hover:text-primary">
              Blog
            </Link>{" "}
            / <span>{post.fields.title}</span>
          </nav>

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

          {post.fields.publishedDate && (
            <p className="text-sm text-accent mb-4">
              {formatDate(post.fields.publishedDate, "pt")}
            </p>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.fields.title}
          </h1>

          <p className="text-xl text-gray-600 mb-12">
            {post.fields.description}
          </p>

          <div className="prose prose-lg max-w-none">
  <p>TESTE</p>
</div>

          {/* RELATED POSTS */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 border-t pt-12">
              <h2 className="text-2xl font-bold mb-6">
                Artigos relacionados
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.sys.id}
                    href={`/pt/blog/${related.fields.slug}`}
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
              href="/pt/blog"
              className="text-primary hover:text-accent"
            >
              ← Voltar ao blog
            </Link>
          </div>
        </article>
      </div>

      <Footer dict={dict.footer} />
    </main>
  )
}
