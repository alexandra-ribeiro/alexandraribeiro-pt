// Client-side storage utility for blog articles

// Type definition for blog articles
export type BlogArticle = {
  _id: string
  title: string
  slug: string
  description: string
  date: string
  image: string
  published: boolean
  language: string
  content?: string
  createdAt?: string
  updatedAt?: string
}

// Prefix for localStorage keys
const STORAGE_PREFIX = "blog_article_"

// Save an article to localStorage
export function saveArticle(article: BlogArticle): BlogArticle {
  if (typeof window === "undefined") {
    console.warn("Cannot save article: localStorage is not available on the server")
    return article
  }

  // Ensure the article has an ID
  if (!article._id) {
    article._id = `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  // Add timestamps if not present
  if (!article.createdAt) {
    article.createdAt = new Date().toISOString()
  }
  article.updatedAt = new Date().toISOString()

  // Save to localStorage
  const key = `${STORAGE_PREFIX}${article._id}`
  localStorage.setItem(key, JSON.stringify(article))
  console.log(`Article saved to localStorage with key: ${key}`, article)

  return article
}

// Get all articles from localStorage
export function getAllArticles(): BlogArticle[] {
  if (typeof window === "undefined") {
    console.warn("Cannot get articles: localStorage is not available on the server")
    return []
  }

  const articles: BlogArticle[] = []

  // Iterate through all localStorage keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(STORAGE_PREFIX)) {
      try {
        const articleJson = localStorage.getItem(key)
        if (articleJson) {
          const article = JSON.parse(articleJson) as BlogArticle
          articles.push(article)
        }
      } catch (error) {
        console.error(`Error parsing article from localStorage key ${key}:`, error)
      }
    }
  }

  console.log(`Retrieved ${articles.length} articles from localStorage`)
  return articles
}

// Get articles by language
// import { getArticlesByLanguage as getBlogArticlesByLanguage, type BlogArticle } from './blog-storage';

// Re-export the BlogArticle type and getArticlesByLanguage function
// export type { BlogArticle };
// export const getArticlesByLanguage = getBlogArticlesByLanguage;
import { getArticlesByLanguage as getBlogArticlesByLanguage } from "./blog-storage"

// Re-export the BlogArticle type and getArticlesByLanguage function
export type { BlogArticle }
export const getArticlesByLanguage = getBlogArticlesByLanguage

// Other client storage functions can remain here
// export function getArticlesByLanguage(language: string): BlogArticle[] {
//   return getAllArticles().filter((article) => article.language === language)
// }

// Get an article by ID
export function getArticleById(id: string): BlogArticle | null {
  if (typeof window === "undefined") {
    console.warn("Cannot get article: localStorage is not available on the server")
    return null
  }

  const key = `${STORAGE_PREFIX}${id}`
  const articleJson = localStorage.getItem(key)

  if (!articleJson) {
    // Try to find by ID without the prefix (in case the full ID was provided)
    for (let i = 0; i < localStorage.length; i++) {
      const currentKey = localStorage.key(i)
      if (currentKey && currentKey.startsWith(STORAGE_PREFIX) && currentKey.includes(id)) {
        const json = localStorage.getItem(currentKey)
        if (json) {
          return JSON.parse(json) as BlogArticle
        }
      }
    }
    return null
  }

  try {
    return JSON.parse(articleJson) as BlogArticle
  } catch (error) {
    console.error(`Error parsing article from localStorage key ${key}:`, error)
    return null
  }
}

// Delete an article by ID
export function deleteArticle(id: string): boolean {
  if (typeof window === "undefined") {
    console.warn("Cannot delete article: localStorage is not available on the server")
    return false
  }

  const key = `${STORAGE_PREFIX}${id}`

  // Check if the article exists
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key)
    console.log(`Article deleted from localStorage with key: ${key}`)
    return true
  }

  // Try to find by ID without the prefix
  for (let i = 0; i < localStorage.length; i++) {
    const currentKey = localStorage.key(i)
    if (currentKey && currentKey.startsWith(STORAGE_PREFIX) && currentKey.includes(id)) {
      localStorage.removeItem(currentKey)
      console.log(`Article deleted from localStorage with key: ${currentKey}`)
      return true
    }
  }

  return false
}

// Update an article
export function updateArticle(article: BlogArticle): BlogArticle {
  if (typeof window === "undefined") {
    console.warn("Cannot update article: localStorage is not available on the server")
    return article
  }

  // Ensure the article has an ID
  if (!article._id) {
    return saveArticle(article)
  }

  // Update timestamp
  article.updatedAt = new Date().toISOString()

  // Find the correct key
  const key = `${STORAGE_PREFIX}${article._id}`

  // Check if the article exists with this key
  if (localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(article))
    console.log(`Article updated in localStorage with key: ${key}`, article)
    return article
  }

  // Try to find by ID without the prefix
  for (let i = 0; i < localStorage.length; i++) {
    const currentKey = localStorage.key(i)
    if (currentKey && currentKey.startsWith(STORAGE_PREFIX) && currentKey.includes(article._id)) {
      localStorage.setItem(currentKey, JSON.stringify(article))
      console.log(`Article updated in localStorage with key: ${currentKey}`, article)
      return article
    }
  }

  // If not found, save as new
  return saveArticle(article)
}
