// Blog storage utility for managing blog posts in localStorage

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
const STORAGE_PREFIX = "va_blog_"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Storage event channel for cross-component communication
export const STORAGE_EVENT_CHANNEL = "va_blog_update"

// Create a custom event to dispatch when articles are modified
const dispatchArticleUpdateEvent = (action = "update") => {
  if (isBrowser) {
    // Create and dispatch a custom event that other components can listen for
    const event = new CustomEvent(STORAGE_EVENT_CHANNEL, {
      detail: { timestamp: Date.now(), action },
    })
    window.dispatchEvent(event)

    // Also dispatch a storage event for legacy support
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_PREFIX,
        newValue: JSON.stringify({ action, updated: Date.now() }),
      }),
    )

    // Dispatch a specific event for clearing
    if (action === "clear") {
      window.dispatchEvent(new Event("blog_storage_cleared"))
    }

    // Force a page reload if we're in development mode
    if (process.env.NODE_ENV === "development") {
      console.log("Development mode: Forcing reload in 500ms")
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }
}

// Save an article to localStorage
export function saveArticle(article: BlogArticle): BlogArticle {
  if (!isBrowser) {
    console.warn("Cannot save article: localStorage is not available on the server")
    return article
  }

  try {
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

    // Notify all components about the update
    dispatchArticleUpdateEvent("save")

    return article
  } catch (error) {
    console.error("Error saving article to localStorage:", error)
    return article
  }
}

// Get all articles from localStorage
export function getAllArticles(): BlogArticle[] {
  if (!isBrowser) {
    return []
  }

  try {
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

    return articles
  } catch (error) {
    console.error("Error getting all articles from localStorage:", error)
    return []
  }
}

// Get articles by language
export function getArticlesByLanguage(language: string): BlogArticle[] {
  if (!isBrowser) {
    return []
  }

  try {
    const articles = getAllArticles()
    return articles.filter((article) => article.language === language && article.published)
  } catch (error) {
    console.error(`Error getting articles by language ${language}:`, error)
    return []
  }
}

// Get an article by ID
export function getArticleById(id: string): BlogArticle | null {
  if (!isBrowser) {
    return null
  }

  try {
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

    return JSON.parse(articleJson) as BlogArticle
  } catch (error) {
    console.error(`Error getting article by ID ${id}:`, error)
    return null
  }
}

// Delete an article by ID
export function deleteArticle(id: string): boolean {
  if (!isBrowser) {
    console.warn("Cannot delete article: localStorage is not available on the server")
    return false
  }

  try {
    const key = `${STORAGE_PREFIX}${id}`

    // Check if the article exists
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)

      // Notify all components about the update
      dispatchArticleUpdateEvent("delete")

      return true
    }

    // Try to find by ID without the prefix
    for (let i = 0; i < localStorage.length; i++) {
      const currentKey = localStorage.key(i)
      if (currentKey && currentKey.startsWith(STORAGE_PREFIX) && currentKey.includes(id)) {
        localStorage.removeItem(currentKey)

        // Notify all components about the update
        dispatchArticleUpdateEvent("delete")

        return true
      }
    }

    return false
  } catch (error) {
    console.error(`Error deleting article by ID ${id}:`, error)
    return false
  }
}

// Update an article
export function updateArticle(article: BlogArticle): BlogArticle {
  if (!isBrowser) {
    console.warn("Cannot update article: localStorage is not available on the server")
    return article
  }

  try {
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

      // Notify all components about the update
      dispatchArticleUpdateEvent("update")

      return article
    }

    // Try to find by ID without the prefix
    for (let i = 0; i < localStorage.length; i++) {
      const currentKey = localStorage.key(i)
      if (currentKey && currentKey.startsWith(STORAGE_PREFIX) && currentKey.includes(article._id)) {
        localStorage.setItem(currentKey, JSON.stringify(article))

        // Notify all components about the update
        dispatchArticleUpdateEvent("update")

        return article
      }
    }

    // If not found, save as new
    return saveArticle(article)
  } catch (error) {
    console.error(`Error updating article:`, error)
    return article
  }
}

// Get an article by slug
export function getArticleBySlug(slug: string): BlogArticle | null {
  if (!isBrowser) {
    return null
  }

  try {
    const articles = getAllArticles()
    return articles.find((article) => article.slug === slug && article.published) || null
  } catch (error) {
    console.error(`Error getting article by slug ${slug}:`, error)
    return null
  }
}

// Clear all blog storage
export function clearBlogStorage(): boolean {
  if (!isBrowser) {
    console.warn("Cannot clear blog storage: localStorage is not available on the server")
    return false
  }

  try {
    console.log("Clearing all blog storage...")

    // Get all keys that start with the blog prefix
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key)
      }
    }

    console.log(`Found ${keysToRemove.length} blog items to remove`)

    // Remove all blog-related items
    keysToRemove.forEach((key) => {
      console.log(`Removing item: ${key}`)
      localStorage.removeItem(key)
    })

    // Notify all components about the clear operation
    dispatchArticleUpdateEvent("clear")

    // Add a timestamp to localStorage to indicate when the clear happened
    localStorage.setItem("va_blog_cleared_at", Date.now().toString())

    console.log("Blog storage cleared successfully")

    return true
  } catch (error) {
    console.error("Error clearing blog storage:", error)
    return false
  }
}

// Check if blog storage was recently cleared
export function wasRecentlyCleared(withinMs = 5000): boolean {
  if (!isBrowser) {
    return false
  }

  const clearedAt = localStorage.getItem("va_blog_cleared_at")
  if (!clearedAt) return false

  const clearedTime = Number.parseInt(clearedAt, 10)
  const now = Date.now()

  return now - clearedTime < withinMs
}
