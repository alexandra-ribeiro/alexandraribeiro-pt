// Simple Storage - A direct localStorage utility for content management

// Storage prefix to avoid conflicts
const STORAGE_PREFIX = "va_content_"

// Save content with a specific key
export function saveContent(key: string, data: any): void {
  if (typeof window === "undefined") {
    console.warn("Cannot save content: localStorage is not available on the server")
    return
  }

  try {
    const storageKey = `${STORAGE_PREFIX}${key}`
    const jsonData = JSON.stringify(data)
    localStorage.setItem(storageKey, jsonData)
    console.log(`Content saved with key: ${storageKey}`, data)
  } catch (error) {
    console.error("Error saving content:", error)
  }
}

// Get content by key
export function getContent(key: string): any {
  if (typeof window === "undefined") {
    console.warn("Cannot get content: localStorage is not available on the server")
    return null
  }

  try {
    const storageKey = `${STORAGE_PREFIX}${key}`
    const data = localStorage.getItem(storageKey)

    if (!data) {
      console.log(`No content found for key: ${storageKey}`)
      return null
    }

    return JSON.parse(data)
  } catch (error) {
    console.error(`Error retrieving content for key: ${key}`, error)
    return null
  }
}

// Clear all content with the storage prefix
export function clearAllContent(): void {
  if (typeof window === "undefined") {
    console.warn("Cannot clear content: localStorage is not available on the server")
    return
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
}

// Debug function to log all stored content
export function debugAllContent(): void {
  if (typeof window === "undefined") {
    console.warn("Cannot debug content: localStorage is not available on the server")
    return
  }

  console.log("--- All Stored Content ---")

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(STORAGE_PREFIX)) {
      try {
        const value = localStorage.getItem(key)
        console.log(`${key}:`, value ? JSON.parse(value) : null)
      } catch (error) {
        console.error(`Error parsing content for key ${key}:`, error)
      }
    }
  }

  console.log("-------------------------")
}
