import { Client } from "@notionhq/client"
import { slugifyServer, unescapeHtml } from "./server-utils"

const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID || "239b92058e15801c87ffe2bb99df4ce6"

export interface Product {
  id: string
  title: string
  description: string
  price: number | null
  linkHtml: string | null
  imageUrl: string | null
  slug: string
  stripePaymentLink: string | null
  features: string | null
}

export async function getProductsFromNotion(lang: "pt" | "en"): Promise<Product[]> {
  try {
    const filterProperty = lang === "pt" ? "pt" : "en"

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: filterProperty,
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Title",
          direction: "ascending",
        },
      ],
    })

    const products: Product[] = response.results.map((page: any) => {
      const title = page.properties.Title?.title?.[0]?.plain_text || "Untitled"
      const description = page.properties.Description?.rich_text?.[0]?.plain_text || ""
      const price = page.properties.Price?.number || null
      const linkRaw = page.properties.Link?.rich_text?.[0]?.plain_text || null
      const linkHtml = linkRaw ? unescapeHtml(linkRaw) : null
      const imageUrl = page.properties.Image?.files?.[0]?.file?.url || page.properties.Image?.external?.url || null
      const stripePaymentLink = page.properties["Stripe Button"]?.rich_text?.[0]?.plain_text || null
      const features = page.properties.Features?.rich_text?.map((item: any) => item.plain_text).join("") || null
      const slug = slugifyServer(title)

      return {
        id: page.id,
        title,
        description,
        price,
        linkHtml,
        imageUrl,
        slug,
        stripePaymentLink,
        features,
      }
    })

    return products
  } catch (error) {
    console.error("Error fetching products from Notion:", error)
    throw error
  }
}

export async function getProductBySlugFromNotion(slug: string, lang: "pt" | "en"): Promise<Product | null> {
  try {
    const filterProperty = lang === "pt" ? "pt" : "en"

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: "Title",
            title: {
              is_not_empty: true,
            },
          },
          {
            property: filterProperty,
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    })

    const products: Product[] = response.results.map((page: any) => {
      const title = page.properties.Title?.title?.[0]?.plain_text || "Untitled"
      const description = page.properties.Description?.rich_text?.[0]?.plain_text || ""
      const price = page.properties.Price?.number || null
      const linkRaw = page.properties.Link?.rich_text?.[0]?.plain_text || null
      const linkHtml = linkRaw ? unescapeHtml(linkRaw) : null
      const imageUrl = page.properties.Image?.files?.[0]?.file?.url || page.properties.Image?.external?.url || null
      const stripePaymentLink = page.properties["Stripe Button"]?.rich_text?.[0]?.plain_text || null
      const features = page.properties.Features?.rich_text?.map((item: any) => item.plain_text).join("") || null
      const productSlug = slugifyServer(title)

      return {
        id: page.id,
        title,
        description,
        price,
        linkHtml,
        imageUrl,
        slug: productSlug,
        stripePaymentLink,
        features,
      }
    })

    return products.find((product) => product.slug === slug) || null
  } catch (error) {
    console.error(`Error fetching product by slug (${slug}) from Notion:`, error)
    throw error
  }
}
