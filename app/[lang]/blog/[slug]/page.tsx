import { Metadata } from "next"
import { getPostBySlug, getImageUrl } from "@/lib/contentful"
import { notFound } from "next/navigation"

const BASE_URL = "https://www.alexandraribeiro.pt"

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, params.lang)

  if (!post) return {}

  const url = `${BASE_URL}/${params.lang}/blog/${post.fields.slug}`
  const imageUrl = getImageUrl(post.fields.featuredImage)

  return {
    title: post.fields.seoTitle || post.fields.title,
    description: post.fields.seoDescription || post.fields.description,

    alternates: {
      canonical: url,
      languages: {
        pt: `${BASE_URL}/pt/blog/${post.fields.slug}`,
        en: `${BASE_URL}/en/blog/${post.fields.slug}`,
        "x-default": `${BASE_URL}/pt/blog/${post.fields.slug}`,
      },
    },

    openGraph: {
      title: post.fields.seoTitle || post.fields.title,
      description: post.fields.seoDescription || post.fields.description,
      url,
      siteName: "Alexandra Ribeiro",
      locale: params.lang === "pt" ? "pt_PT" : "en_US",
      type: "article",
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
      title: post.fields.seoTitle || post.fields.title,
      description: post.fields.seoDescription || post.fields.description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const post = await getPostBySlug(params.slug, params.lang)

  if (!post) notFound()

  /* resto do teu JSX mantém-se igual */
  return (
    <article>
      {/* conteúdo existente */}
    </article>
  )
}
