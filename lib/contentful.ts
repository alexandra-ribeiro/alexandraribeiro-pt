import { createClient } from "contentful"

const getClient = () => {
  // Only use server-side environment variables for Contentful
  const space = process.env.CONTENTFUL_SPACE_ID
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

  if (!space || !accessToken) {
    console.warn(
      "Missing Contentful environment variables. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN.",
    )
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

export interface BlogPost {
  sys: {
    id: string
  }
  fields: {
    title: string
    slug: string
    description: string
    content?: any
    publishedDate?: string
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
    language: string
  }
}

export async function getBlogPosts(lang: string): Promise<BlogPost[]> {
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
    })

    return response.items as unknown as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts from Contentful:", error)
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

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const client = getClient()

    if (!client) {
      console.warn("Contentful client not available")
      return null
    }

    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    })

    if (!response.items || response.items.length === 0) {
      return null
    }

    return response.items[0] as unknown as BlogPost
  } catch (error) {
    console.error("Error fetching blog post from Contentful:", error)
    return null
  }
}

export function getImageUrl(image: any): string {
  if (!image || !image.fields || !image.fields.file || !image.fields.file.url) {
    return "/placeholder.svg"
  }

  // Make sure the URL starts with https:
  const url = image.fields.file.url
  return url.startsWith("//") ? `https:${url}` : url.startsWith("http") ? url : `https:${url}`
}
