"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getArticlesByLanguage, type BlogArticle, STORAGE_EVENT_CHANNEL } from "@/lib/blog-storage"

interface ClientBlogListProps {
  initialPosts: any[]
  lang: string
}

export default function ClientBlogList({ initialPosts, lang }: ClientBlogListProps) {
  const [localPosts, setLocalPosts] = useState<BlogArticle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load posts from localStorage
  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true)
        setError(null)

        // Load from localStorage
        if (typeof window !== "undefined") {
          console.log("ClientBlogList: Loading articles for language:", lang)
          const articlesFromStorage = getArticlesByLanguage(lang)
          console.log("ClientBlogList: Articles loaded:", articlesFromStorage)
          setLocalPosts(articlesFromStorage)
        }
      } catch (err) {
        console.error("Error loading blog posts:", err)
        setError("Failed to load blog posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    // Initial load
    loadPosts()

    // Set up event listeners for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith("va_blog_")) {
        console.log("ClientBlogList: Storage event detected, reloading local posts")
        if (typeof window !== "undefined") {
          const articlesFromStorage = getArticlesByLanguage(lang)
          setLocalPosts(articlesFromStorage)
        }
      }
    }

    // Custom event handler for direct component communication
    const handleCustomEvent = (e: Event) => {
      console.log("ClientBlogList: Custom update event detected, reloading local posts")
      if (typeof window !== "undefined") {
        const articlesFromStorage = getArticlesByLanguage(lang)
        setLocalPosts(articlesFromStorage)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange)
      window.addEventListener(STORAGE_EVENT_CHANNEL, handleCustomEvent)

      return () => {
        window.removeEventListener("storage", handleStorageChange)
        window.removeEventListener(STORAGE_EVENT_CHANNEL, handleCustomEvent)
      }
    }
  }, [lang])

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-3 w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (localPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">
          {lang === "en" ? "New articles coming soon. Stay tuned!" : "Novos artigos em breve. Fique ligado!"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {localPosts.map((post) => (
        <article
          key={`local-${post._id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <Link href={`/${lang}/blog/${post.slug}`}>
            <div className="relative h-48 w-full">
              {post.image ? (
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=400&text=Blog"
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
          </Link>
          <div className="p-6">
            <p className="text-accent text-sm font-medium mb-2">{post.date}</p>
            <Link href={`/${lang}/blog/${post.slug}`}>
              <h2 className="text-xl font-bold mb-3 text-primary hover:text-accent transition-colors">{post.title}</h2>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
            <Link
              href={`/${lang}/blog/${post.slug}`}
              className="inline-flex items-center text-primary hover:text-accent transition-colors"
            >
              {lang === "en" ? "Read more" : "Ler mais"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
