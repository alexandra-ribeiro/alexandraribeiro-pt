"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "./language-provider"
import { getArticlesByLanguage, type BlogArticle, STORAGE_EVENT_CHANNEL } from "@/lib/blog-storage"

export default function BlogPreview({ dict }: { dict: any }) {
  const { lang } = useLanguage()
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Add a key to force re-render when storage changes
  const [storageVersion, setStorageVersion] = useState(Date.now())

  // Function to load articles
  const loadArticles = () => {
    try {
      if (typeof window !== "undefined") {
        console.log("BlogPreview: Loading articles for language:", lang)
        // Force a fresh load from storage
        const articlesFromStorage = getArticlesByLanguage(lang)
        console.log("BlogPreview: Articles loaded:", articlesFromStorage)

        // Get only the 3 most recent articles
        const recentArticles = [...articlesFromStorage]
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || a.date || "")
            const dateB = new Date(b.createdAt || b.date || "")
            return dateB.getTime() - dateA.getTime()
          })
          .slice(0, 3)

        console.log("BlogPreview: Recent articles to display:", recentArticles)
        setArticles(recentArticles)

        // Update storage version to force re-render
        setStorageVersion(Date.now())
      }
    } catch (err) {
      console.error("Error loading articles for preview:", err)
      setError("Failed to load articles")
    } finally {
      setIsLoading(false)
    }
  }

  // Force reload when component mounts
  useEffect(() => {
    // Clear any cached data
    if (typeof window !== "undefined") {
      // Force reload from storage
      loadArticles()
    }
  }, [lang, storageVersion])

  // Set up event listeners for storage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      console.log("BlogPreview: Storage event detected", e)
      // Force reload regardless of the key
      loadArticles()
    }

    // Custom event handler for direct component communication
    const handleCustomEvent = (e: Event) => {
      console.log("BlogPreview: Custom update event detected", e)
      loadArticles()
    }

    // Handle page visibility changes to reload when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("BlogPreview: Page became visible, reloading articles")
        loadArticles()
      }
    }

    if (typeof window !== "undefined") {
      // Listen for storage events
      window.addEventListener("storage", handleStorageChange)
      window.addEventListener(STORAGE_EVENT_CHANNEL, handleCustomEvent)
      document.addEventListener("visibilitychange", handleVisibilityChange)

      // Also listen for a specific clear event
      window.addEventListener("blog_storage_cleared", loadArticles)

      return () => {
        window.removeEventListener("storage", handleStorageChange)
        window.removeEventListener(STORAGE_EVENT_CHANNEL, handleCustomEvent)
        document.removeEventListener("visibilitychange", handleVisibilityChange)
        window.removeEventListener("blog_storage_cleared", loadArticles)
      }
    }
  }, [lang])

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent text-sm uppercase tracking-widest font-medium mb-3 block">{dict.subtitle}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{dict.title}</h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-6"></div>
          <p className="text-foreground/80 max-w-2xl mx-auto">{dict.description}</p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{dict.errorMessage || "Failed to load articles. Please try again later."}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{dict.emptyMessage || "New articles coming soon. Stay tuned!"}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article, index) => (
              <div
                key={`${article._id || index}-${storageVersion}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/${lang}/blog/${article.slug}`}>
                  <div className="relative h-48 w-full">
                    <img
                      src={article.image || `/placeholder.svg?height=200&width=400&text=Blog`}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=200&width=400&text=Blog"
                      }}
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <p className="text-accent text-sm font-medium mb-2">{article.date}</p>
                  <Link href={`/${lang}/blog/${article.slug}`}>
                    <h3 className="text-xl font-bold mb-3 text-primary hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                  <Link
                    href={`/${lang}/blog/${article.slug}`}
                    className="inline-flex items-center text-primary hover:text-accent transition-colors"
                  >
                    {lang === "en" ? "Read more" : "Ler mais"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center text-primary hover:text-accent transition-colors font-medium"
          >
            {dict.viewAll}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
