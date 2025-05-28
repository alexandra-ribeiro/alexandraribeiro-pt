"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getArticlesByLanguage, type BlogArticle, STORAGE_EVENT_CHANNEL } from "@/lib/blog-storage"

interface ClientArticlesProps {
  language: string
}

export default function ClientArticles({ language }: ClientArticlesProps) {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Function to load articles
  const loadArticles = () => {
    try {
      // Safely get articles from localStorage
      if (typeof window !== "undefined") {
        console.log("ClientArticles: Loading articles for language:", language)
        const articlesFromStorage = getArticlesByLanguage(language)
        console.log("ClientArticles: Articles loaded:", articlesFromStorage)
        setArticles(articlesFromStorage)
      }
    } catch (err) {
      console.error("Error loading articles:", err)
      setError("Failed to load articles")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial load
    loadArticles()

    // Set up event listeners for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith("va_blog_")) {
        console.log("ClientArticles: Storage event detected, reloading articles")
        loadArticles()
      }
    }

    // Custom event handler for direct component communication
    const handleCustomEvent = (e: Event) => {
      console.log("ClientArticles: Custom update event detected, reloading articles")
      loadArticles()
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange)
      window.addEventListener(STORAGE_EVENT_CHANNEL, handleCustomEvent)

      return () => {
        window.removeEventListener("storage", handleStorageChange)
        window.removeEventListener(STORAGE_EVENT_CHANNEL, handleCustomEvent)
      }
    }
  }, [language])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <p className="text-gray-500 mt-2">
          {language === "pt" ? "Tente novamente mais tarde." : "Please try again later."}
        </p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {language === "pt" ? "Novos artigos em breve. Fique ligado!" : "New articles coming soon. Stay tuned!"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link href={`/${language}/blog/${article.slug}`} key={article._id || article.slug}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={article.image || "/placeholder.svg?height=200&width=400&text=Blog"}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=200&width=400&text=Blog"
                }}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{article.date}</p>
              <p className="text-gray-600 line-clamp-3">{article.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
