import { MetadataRoute } from "next"

const BASE_URL = "https://www.alexandraribeiro.pt"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/services",
    "/about",
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


  return sitemapEntries
}
