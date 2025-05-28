// Content Manager - A localStorage-based CMS utility

// Define content types
export type ContentType = "home" | "about" | "services" | "contact" | "blog" | "faq" | "global"

// Define content structure
export interface ContentItem {
  id: string
  type: ContentType
  language: string
  data: any
  updatedAt: string
  createdAt: string
}

// Storage prefix
const STORAGE_PREFIX = "va_cms_"

// Helper to generate storage key
const getStorageKey = (type: ContentType, language: string, id?: string) => {
  return `${STORAGE_PREFIX}${type}_${language}${id ? `_${id}` : ""}`
}

// Save content
export function saveContent(type: ContentType, language: string, data: any, id?: string): ContentItem {
  if (typeof window === "undefined") {
    console.warn("Cannot save content: localStorage is not available on the server")
    return {
      id: id || `temp_${Date.now()}`,
      type,
      language,
      data,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
  }

  // Generate ID if not provided
  const contentId = id || `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

  // Create content item
  const contentItem: ContentItem = {
    id: contentId,
    type,
    language,
    data,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }

  // Check if this is an update to existing content
  const existingKey = getStorageKey(type, language, id)
  const existingContent = localStorage.getItem(existingKey)

  if (existingContent) {
    try {
      const parsed = JSON.parse(existingContent) as ContentItem
      contentItem.createdAt = parsed.createdAt
    } catch (error) {
      console.error("Error parsing existing content:", error)
    }
  }

  // For single-instance content types (home, about, services, contact)
  if (["home", "about", "services", "contact", "global"].includes(type)) {
    const key = getStorageKey(type, language)
    localStorage.setItem(key, JSON.stringify(contentItem))
    console.log(`Saved ${type} content for ${language}:`, contentItem)
  }
  // For multi-instance content types (blog, faq)
  else {
    const key = getStorageKey(type, language, contentId)
    localStorage.setItem(key, JSON.stringify(contentItem))
    console.log(`Saved ${type} item with ID ${contentId} for ${language}:`, contentItem)
  }

  return contentItem
}

// Get single content
export function getContent(type: ContentType, language: string): any {
  if (typeof window === "undefined") {
    console.warn("Cannot get content: localStorage is not available on the server")
    return null
  }

  // For single-instance content types
  if (["home", "about", "services", "contact", "global"].includes(type)) {
    const key = getStorageKey(type, language)
    const content = localStorage.getItem(key)

    if (!content) {
      console.log(`No ${type} content found for ${language}`)
      return null
    }

    try {
      const parsed = JSON.parse(content) as ContentItem
      return parsed.data
    } catch (error) {
      console.error(`Error parsing ${type} content for ${language}:`, error)
      return null
    }
  }

  return null
}

// Get content item by ID
export function getContentById(type: ContentType, language: string, id: string): ContentItem | null {
  if (typeof window === "undefined") {
    console.warn("Cannot get content: localStorage is not available on the server")
    return null
  }

  const key = getStorageKey(type, language, id)
  const content = localStorage.getItem(key)

  if (!content) {
    // Try to find by ID in all keys of this type
    for (let i = 0; i < localStorage.length; i++) {
      const currentKey = localStorage.key(i)
      if (currentKey && currentKey.startsWith(`${STORAGE_PREFIX}${type}_`) && currentKey.includes(id)) {
        const itemContent = localStorage.getItem(currentKey)
        if (itemContent) {
          try {
            return JSON.parse(itemContent) as ContentItem
          } catch (error) {
            console.error(`Error parsing content for key ${currentKey}:`, error)
          }
        }
      }
    }

    console.log(`No ${type} content found with ID ${id} for ${language}`)
    return null
  }

  try {
    return JSON.parse(content) as ContentItem
  } catch (error) {
    console.error(`Error parsing ${type} content with ID ${id} for ${language}:`, error)
    return null
  }
}

// Get all content of a specific type
export function getAllContent(type: ContentType, language: string): ContentItem[] {
  if (typeof window === "undefined") {
    console.warn("Cannot get content: localStorage is not available on the server")
    return []
  }

  const items: ContentItem[] = []
  const prefix = `${STORAGE_PREFIX}${type}_${language}`

  // Iterate through localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(prefix)) {
      try {
        const content = localStorage.getItem(key)
        if (content) {
          const item = JSON.parse(content) as ContentItem
          items.push(item)
        }
      } catch (error) {
        console.error(`Error parsing content for key ${key}:`, error)
      }
    }
  }

  console.log(`Found ${items.length} ${type} items for ${language}`)
  return items
}

// Delete content
export function deleteContent(type: ContentType, language: string, id?: string): boolean {
  if (typeof window === "undefined") {
    console.warn("Cannot delete content: localStorage is not available on the server")
    return false
  }

  // For single-instance content types
  if (["home", "about", "services", "contact", "global"].includes(type) && !id) {
    const key = getStorageKey(type, language)
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)
      console.log(`Deleted ${type} content for ${language}`)
      return true
    }
    return false
  }

  // For multi-instance content types or when ID is provided
  if (id) {
    const key = getStorageKey(type, language, id)
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)
      console.log(`Deleted ${type} content with ID ${id} for ${language}`)
      return true
    }

    // Try to find by ID in all keys of this type
    for (let i = 0; i < localStorage.length; i++) {
      const currentKey = localStorage.key(i)
      if (currentKey && currentKey.startsWith(`${STORAGE_PREFIX}${type}_`) && currentKey.includes(id)) {
        localStorage.removeItem(currentKey)
        console.log(`Deleted ${type} content with ID ${id} for ${language}`)
        return true
      }
    }
  }

  return false
}

// Export all content as JSON
export function exportAllContent(): string {
  if (typeof window === "undefined") {
    console.warn("Cannot export content: localStorage is not available on the server")
    return "{}"
  }

  const content: Record<string, any> = {}

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(STORAGE_PREFIX)) {
      const item = localStorage.getItem(key)
      if (item) {
        content[key] = item
      }
    }
  }

  return JSON.stringify(content, null, 2)
}

// Import content from JSON
export function importContent(jsonContent: string): boolean {
  if (typeof window === "undefined") {
    console.warn("Cannot import content: localStorage is not available on the server")
    return false
  }

  try {
    const content = JSON.parse(jsonContent) as Record<string, string>

    Object.entries(content).forEach(([key, value]) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.setItem(key, value)
      }
    })

    console.log("Content imported successfully")
    return true
  } catch (error) {
    console.error("Error importing content:", error)
    return false
  }
}

// Clear all content (dangerous!)
export function clearAllContent(): boolean {
  if (typeof window === "undefined") {
    console.warn("Cannot clear content: localStorage is not available on the server")
    return false
  }

  const keysToRemove: string[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key)
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key))
  console.log(`Cleared ${keysToRemove.length} content items`)

  return true
}

// Get content with fallback to default data
export function getContentWithFallback<T>(type: ContentType, language: string, defaultData: T): T {
  const content = getContent(type, language)
  return content || defaultData
}
