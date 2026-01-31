import { createClient } from "contentful"

/* ---------------------------
   CLIENT
---------------------------- */
const getClient = () => {
  const space = "s6yvdch48olm"
const accessToken = "-7DsC8TRmQ5Ig6drErJdGLk29G7UmAjwwbMFANITzUc"

  if (!space || !accessToken) {
    console.warn("Missing Contentful credentials")
    return null
  }

  try {
    return createClient({
      space,
      accessToken,
    })
  } catch (error) {
    console.error("Error creating Contentful client:", error)
    return null
  }
}

/* ---------------------------
   TYPES
---------------------------- */
export interface BlogPost {
  sys: {
    id: string
    updatedAt: string
    publishedAt?: string
  }
  fields: {
    title: string
    slug: string
    description: string
    content?: any
    publishedDate?: string
    language: string

    featuredImage?: {
      fields: {
        file: {
          url: string
          details?: {
            image?: {
              width: number
              height: number
            }
          }
        }
        title?: string
      }
    }

    author?: {
      fields: {
        name: string
        picture?: {
          fields: {
            file: {
              url: string
            }
          }
        }
      }
    }

    seoTitle?: string
    seoDescription?: string
  }
   metadata: {
    tags: {
      sys: {
        id: string
      }
    }[]
  }
}

export async function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }]
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const client = getClient()

    if (!client) {
      console.warn("Contentful client not available")
      return []
    }

    const response = await client.getEntries({
      content_type: "blogPost",
      select: "fields.slug",
      limit: 1000,
    })

    return response.items
      .map((item: any) => item.fields.slug)
      .filter(Boolean)
  } catch (error) {
    console.error("Error fetching blog slugs from Contentful:", error)
    return []
  }
}


export async function getRecentPosts(lang: string, limit = 3): Promise<BlogPost[]> {
  try {
    const client = getClient()

    if (!client) {
      console.warn("Contentful client not available")
      return []
    }

    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.language": lang,
      order: "-fields.publishedDate",
      limit,
    })

    return response.items as unknown as BlogPost[]
  } catch (error) {
    console.error("Error fetching recent blog posts from Contentful:", error)
    return []
  }
}

/* ---------------------------
   BLOG LIST (por idioma)
---------------------------- */
export async function getBlogPosts(lang: string): Promise<BlogPost[]> {
  const client = getClient()
  if (!client) return []

  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.language": lang,
    order: "-fields.publishedDate",
  })

  return response.items as unknown as BlogPost[]
}

/* ---------------------------
   BLOG POST (slug + idioma)
---------------------------- */
export async function getPostBySlug(
  slug: string,
  lang: string
): Promise<BlogPost | null> {
  const client = getClient()
  if (!client) return null

  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    "fields.language": lang,
    limit: 1,
  })

  return response.items?.[0]
    ? (response.items[0] as unknown as BlogPost)
    : null
}

/* Posts relacionados por TAG (Contentful native tags) */
export async function getPostsByTag(
  tagId: string,
  lang: string
): Promise<BlogPost[]> {
  const client = getClient()
  if (!client) return []

  const response = await client.getEntries({
    content_type: "blogPost",
    "metadata.tags.sys.id[in]": tagId,
    "fields.language": lang,
    order: "-fields.publishedDate",
  })

  return response.items as unknown as BlogPost[]
}

/* ---------------------------
   TODOS OS POSTS (SITEMAP)
---------------------------- */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const client = getClient()
  if (!client) return []

  const response = await client.getEntries({
    content_type: "blogPost",
    select: "fields.slug,fields.publishedDate,sys.updatedAt",
    limit: 1000,
  })

  return response.items as unknown as BlogPost[]
}

/* ---------------------------
   IMAGE HELPER
---------------------------- */
export function getImageUrl(image: any): string {
  if (!image?.fields?.file?.url) return "/placeholder.svg"

  const url = image.fields.file.url

  return url.startsWith("//")
    ? `https:${url}`
    : url.startsWith("http")
    ? url
    : `https:${url}`
}

export async function getRelatedPostsByTags(
  tagIds: string[],
  lang: string,
  excludeSlug: string
): Promise<BlogPost[]> {
  const client = getClient()
  if (!client || tagIds.length === 0) return []

  const response = await client.getEntries({
    content_type: "blogPost",
    "fields.language": lang,
    "metadata.tags.sys.id[in]": tagIds.join(","),
    "fields.slug[ne]": excludeSlug,
    limit: 3,
  })

  return response.items as BlogPost[]
}

export async function getTagSeo(tagId: string, lang: string) {
  const client = getClient()
  if (!client) return null

  const res = await client.getEntries({
    content_type: "blogTagSeo",
    "fields.tagId": tagId,
    "fields.lang": lang,
    limit: 1,
  })

  return res.items?.[0] ?? null
}
