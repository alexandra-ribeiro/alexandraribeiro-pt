import { MetadataRoute } from "next"
import { getAllBlogSlugs } from "@/lib/contentful"

const BASE_URL = "https://www.alexandraribeiro.pt"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/services",
    "/about",
    "/blog",
    "/portfolio",
    "/store",
    "/contact",
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // páginas estáticas PT + EN
  staticPages.forEach((page) => {
    sitemapEntries.push(
      {
        url: `${BASE_URL}/pt${page}`,
        lastModified: new Date(),
      },
      {
        url: `${BASE_URL}/en${page}`,
        lastModified: new Date(),
      }
    )
  })

  // artigos do blog (slugs vêm do Contentful)
  const slugs = await getAllBlogSlugs()

  slugs.forEach((slug) => {
    sitemapEntries.push(
      {
        url: `${BASE_URL}/pt/blog/${slug}`,
        lastModified: new Date(),
      },
      {
        url: `${BASE_URL}/en/blog/${slug}`,
        lastModified: new Date(),
      }
    )
  })

  return sitemapEntries
}
