export type Locale = "pt" | "en"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  author: string
  tags: string[]
  language: Locale
  featured: boolean
  featuredImage?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  services: string[]
  createdAt: string
  read: boolean
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  createdAt: string
}
