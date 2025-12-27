import { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/contentful"

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

  /* ---------------------------
     PÁGINAS ESTÁTICAS (PT + EN)
  ---------------------------- */
  staticPages.forEach((page) => {
    sitemapEntries.push(
      {
        url: `${BASE_URL}/pt${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "" ? 1.0 : 0.8,
      },
      {
        url: `${BASE_URL}/en${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "" ? 1.0 : 0.8,
      }
    )
  })

  /* ---------------------------
     ARTIGOS DO BLOG (Contentful)
  ---------------------------- */
  const posts = await getAllBlogPosts()

  posts.forEach((post) => {
    const lastModified =
      post.fields.updatedAt ||
      post.fields.publishedDate ||
      new Date()

    sitemapEntries.push(
      {
        url: `${BASE_URL}/pt/blog/${post.fields.slug}`,
        lastModified: new Date(lastModified),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/en/blog/${post.fields.slug}`,
        lastModified: new Date(lastModified),
        changeFrequency: "weekly",
        priority: 0.7,
      }
    )
  })

  return sitemapEntries
}
