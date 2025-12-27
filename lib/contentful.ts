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
