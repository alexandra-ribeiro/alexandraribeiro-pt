// Simplified data API without MongoDB - uses local storage fallbacks only
import type { BlogArticle } from "../models/BlogArticle"

// Simple in-memory storage for development/demo purposes
let articlesStore: BlogArticle[] = []
let usersStore: any[] = []

export class MongoDBDataAPI {
  private static instance: MongoDBDataAPI

  static getInstance(): MongoDBDataAPI {
    if (!MongoDBDataAPI.instance) {
      MongoDBDataAPI.instance = new MongoDBDataAPI()
    }
    return MongoDBDataAPI.instance
  }

  // Blog Articles
  async getArticles(): Promise<BlogArticle[]> {
    try {
      // Try to load from localStorage first
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("blog_articles")
        if (stored) {
          articlesStore = JSON.parse(stored)
        }
      }
      return articlesStore
    } catch (error) {
      console.error("Error getting articles:", error)
      return []
    }
  }

  async getArticle(id: string): Promise<BlogArticle | null> {
    try {
      const articles = await this.getArticles()
      return articles.find((article) => article.id === id) || null
    } catch (error) {
      console.error("Error getting article:", error)
      return null
    }
  }

  async createArticle(article: Omit<BlogArticle, "id" | "createdAt" | "updatedAt">): Promise<BlogArticle> {
    try {
      const newArticle: BlogArticle = {
        ...article,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      articlesStore.push(newArticle)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("blog_articles", JSON.stringify(articlesStore))
      }

      return newArticle
    } catch (error) {
      console.error("Error creating article:", error)
      throw error
    }
  }

  async updateArticle(id: string, updates: Partial<BlogArticle>): Promise<BlogArticle | null> {
    try {
      const articles = await this.getArticles()
      const index = articles.findIndex((article) => article.id === id)

      if (index === -1) {
        return null
      }

      const updatedArticle = {
        ...articles[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      articlesStore[index] = updatedArticle

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("blog_articles", JSON.stringify(articlesStore))
      }

      return updatedArticle
    } catch (error) {
      console.error("Error updating article:", error)
      return null
    }
  }

  async deleteArticle(id: string): Promise<boolean> {
    try {
      const articles = await this.getArticles()
      const index = articles.findIndex((article) => article.id === id)

      if (index === -1) {
        return false
      }

      articlesStore.splice(index, 1)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("blog_articles", JSON.stringify(articlesStore))
      }

      return true
    } catch (error) {
      console.error("Error deleting article:", error)
      return false
    }
  }

  // Users
  async getUsers(): Promise<any[]> {
    try {
      // Try to load from localStorage first
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("users")
        if (stored) {
          usersStore = JSON.parse(stored)
        }
      }
      return usersStore
    } catch (error) {
      console.error("Error getting users:", error)
      return []
    }
  }

  async createUser(user: any): Promise<any> {
    try {
      const newUser = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }

      usersStore.push(newUser)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("users", JSON.stringify(usersStore))
      }

      return newUser
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  // Contact form submissions
  async saveContactSubmission(submission: any): Promise<any> {
    try {
      const newSubmission = {
        ...submission,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }

      // Try to load existing submissions
      let submissions: any[] = []
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("contact_submissions")
        if (stored) {
          submissions = JSON.parse(stored)
        }
      }

      submissions.push(newSubmission)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("contact_submissions", JSON.stringify(submissions))
      }

      return newSubmission
    } catch (error) {
      console.error("Error saving contact submission:", error)
      throw error
    }
  }

  async getContactSubmissions(): Promise<any[]> {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("contact_submissions")
        if (stored) {
          return JSON.parse(stored)
        }
      }
      return []
    } catch (error) {
      console.error("Error getting contact submissions:", error)
      return []
    }
  }
}

export default MongoDBDataAPI
