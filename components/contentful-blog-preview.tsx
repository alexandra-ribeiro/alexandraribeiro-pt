"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getRecentPosts, getImageUrl, type BlogPost } from "@/lib/contentful"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BlogPreviewProps {
  dict: any
  lang: string
}

export default function ContentfulBlogPreview({ dict, lang }: BlogPreviewProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true)
        setError(null)
        const recentPosts = await getRecentPosts(lang)
        console.log("ContentfulBlogPreview: Loaded recent posts:", recentPosts.length)
        setPosts(recentPosts)
      } catch (err) {
        console.error("Error loading blog posts:", err)
        setError("Failed to load blog posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [lang])

  if (error) {
    return (
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{dict.title}</h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-8"></div>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{dict.title}</h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-8"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-8">
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
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{dict.title}</h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-8"></div>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {lang === "pt" ? "Novos artigos em breve. Fique ligado!" : "New articles coming soon. Stay tuned!"}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 texture-grid opacity-20"></div>

      <div className="container mx-auto relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-accent text-sm uppercase tracking-widest font-medium mb-3 block">Blog</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{dict.title}</h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.sys.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover-lift group"
            >
              <div className="relative h-56 w-full overflow-hidden">
                {post.fields.featuredImage ? (
                  <Image
                    src={getImageUrl(post.fields.featuredImage) || "/placeholder.svg"}
                    alt={post.fields.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <div className="text-xs text-accent font-medium uppercase tracking-wider mb-3">
                  {post.fields.publishedDate ? formatDate(post.fields.publishedDate, lang) : ""}
                </div>
                <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors duration-300">
                  {post.fields.title}
                </h3>
                <p className="text-foreground/70 mb-6 line-clamp-3">{post.fields.description}</p>
                <Link
                  href={`/${lang}/blog/${post.fields.slug}`}
                  className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors duration-300"
                >
                  {dict.readMoreButton || (lang === "en" ? "Read more" : "Ler mais")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href={`/${lang}/blog`}>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-base bg-transparent"
            >
              {dict.viewAllButton || (lang === "en" ? "View all articles" : "Ver todos os artigos")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
