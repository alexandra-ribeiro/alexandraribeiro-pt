import { createClient } from "contentful"

// Only use server-side environment variables for Contentful
const getClient = () => {
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

export interface Product {
  sys: {
    id: string
  }
  fields: {
    title: string
    description?: string
    price?: number
    features?: any // RichText type
    link?: any // RichText type
    image?: {
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
  }
}

export async function getProducts(lang: string): Promise<Product[]> {
  try {
    const client = getClient()

    if (!client) {
      console.warn("Contentful client not available for products.")
      return []
    }

    // Fetch entries of content_type "products"
    // Explicitly request locale 'en-US' for product details as requested
    const response = await client.getEntries({
      content_type: "products",
      locale: "en-US", // Force en-US locale for products
      order: "sys.createdAt", // Order by creation date, or adjust as needed
    })

    return response.items as unknown as Product[]
  } catch (error) {
    console.error("Error fetching products from Contentful:", error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const client = getClient()

    if (!client) {
      console.warn("Contentful client not available for product by slug.")
      return null
    }

    const response = await client.getEntries({
      content_type: "products",
      "fields.slug": slug, // Assuming you have a 'slug' field for products
      locale: "en-US",
      limit: 1,
    })

    if (!response.items || response.items.length === 0) {
      return null
    }

    return response.items[0] as unknown as Product
  } catch (error) {
    console.error("Error fetching product by slug from Contentful:", error)
    return null
  }
}

export function getProductImageUrl(image: any): string {
  if (!image || !image.fields || !image.fields.file || !image.fields.file.url) {
    return "/placeholder.svg"
  }

  const url = image.fields.file.url
  return url.startsWith("//") ? `https:${url}` : url.startsWith("http") ? url : `https:${url}`
}
