import { getPostBySlug, getImageUrl } from "@/lib/contentful"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

export async function generateMetadata({ params }: { params: { slug: string; lang: string } }) {
  try {
    const post = await getPostBySlug(params.slug)
export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata> {
  const lang = params.lang === "en" ? "en" : "pt"
  const baseUrl = "https://www.alexandraribeiro.pt"

    if (!post) {
      return {
        title: "Article Not Found",
        description: "The requested article could not be found.",
      }
    }
  const post = await getPostBySlug(params.slug, lang)

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
