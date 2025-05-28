import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ""
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Helper function for generating image URLs from Sanity image references
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Blog post queries
export async function getBlogPosts(lang: string) {
  return await client.fetch(
    `*[_type == "post" && language == $lang] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      description,
      "author": author->name,
      language,
    }`,
    { lang },
  )
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      description,
      "author": author->name,
      content,
      language,
    }`,
    { slug },
  )
}

export async function getRecentPosts(lang: string, limit = 3) {
  return await client.fetch(
    `*[_type == "post" && language == $lang] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      description,
      "author": author->name,
      language,
    }`,
    { lang, limit: limit - 1 },
  )
}
