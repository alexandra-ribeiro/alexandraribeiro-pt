// Simplified data API without MongoDB - uses local storage fallbacks
interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  author: string
  publishedAt: string
  tags: string[]
  featured: boolean
  language: "pt" | "en"
}

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
  read: boolean
}

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  createdAt: string
}

// In-memory storage for development/fallback
let blogPosts: BlogPost[] = []
let contactMessages: ContactMessage[] = []
const users: User[] = [
  {
    id: "1",
    email: "admin@alexandraribeiro.pt",
    name: "Alexandra Ribeiro",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
]

// Blog Posts API
export async function getBlogPosts(language?: "pt" | "en"): Promise<BlogPost[]> {
  try {
    // Try to load from localStorage if available
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("blogPosts")
      if (stored) {
        blogPosts = JSON.parse(stored)
      }
    }

    return language ? blogPosts.filter((post) => post.language === language) : blogPosts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getBlogPosts()
    return posts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function createBlogPost(post: Omit<BlogPost, "id">): Promise<BlogPost> {
  try {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    }

    blogPosts.push(newPost)

    // Save to localStorage if available
    if (typeof window !== "undefined") {
      localStorage.setItem("blogPosts", JSON.stringify(blogPosts))
    }

    return newPost
  } catch (error) {
    console.error("Error creating blog post:", error)
    throw error
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const index = blogPosts.findIndex((post) => post.id === id)
    if (index === -1) return null

    blogPosts[index] = { ...blogPosts[index], ...updates }

    // Save to localStorage if available
    if (typeof window !== "undefined") {
      localStorage.setItem("blogPosts", JSON.stringify(blogPosts))
    }

    return blogPosts[index]
  } catch (error) {
    console.error("Error updating blog post:", error)
    return null
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const index = blogPosts.findIndex((post) => post.id === id)
    if (index === -1) return false

    blogPosts.splice(index, 1)

    // Save to localStorage if available
    if (typeof window !== "undefined") {
      localStorage.setItem("blogPosts", JSON.stringify(blogPosts))
    }

    return true
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return false
  }
}

// Contact Messages API
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    // Try to load from localStorage if available
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("contactMessages")
      if (stored) {
        contactMessages = JSON.parse(stored)
      }
    }

    return contactMessages
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return []
  }
}

export async function createContactMessage(
  message: Omit<ContactMessage, "id" | "createdAt" | "read">,
): Promise<ContactMessage> {
  try {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false,
    }

    contactMessages.push(newMessage)

    // Save to localStorage if available
    if (typeof window !== "undefined") {
      localStorage.setItem("contactMessages", JSON.stringify(contactMessages))
    }

    return newMessage
  } catch (error) {
    console.error("Error creating contact message:", error)
    throw error
  }
}

export async function markMessageAsRead(id: string): Promise<boolean> {
  try {
    const index = contactMessages.findIndex((msg) => msg.id === id)
    if (index === -1) return false

    contactMessages[index].read = true

    // Save to localStorage if available
    if (typeof window !== "undefined") {
      localStorage.setItem("contactMessages", JSON.stringify(contactMessages))
    }

    return true
  } catch (error) {
    console.error("Error marking message as read:", error)
    return false
  }
}

// Users API
export async function getUsers(): Promise<User[]> {
  try {
    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return users.find((user) => user.email === email) || null
  } catch (error) {
    console.error("Error fetching user by email:", error)
    return null
  }
}

export async function createUser(user: Omit<User, "id" | "createdAt">): Promise<User> {
  try {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    return newUser
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Health check
export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  }
}
