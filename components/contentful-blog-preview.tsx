"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"

interface ContentfulBlogPreviewProps {
  dict: any
  lang: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  author: string
  featuredImage?: string
  readingTime: number
}

export default function ContentfulBlogPreview({ dict, lang }: ContentfulBlogPreviewProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("blog-preview")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    // Mock blog posts for demonstration
    const mockPosts: BlogPost[] = [
      {
        id: "1",
        title:
          lang === "en"
            ? "10 Essential Tasks for Virtual Assistants"
            : "10 Tarefas Essenciais para Assistentes Virtuais",
        slug: "10-tarefas-essenciais-assistentes-virtuais",
        excerpt:
          lang === "en"
            ? "Discover the most important tasks that every virtual assistant should master to provide exceptional service to their clients."
            : "Descubra as tarefas mais importantes que todo assistente virtual deve dominar para prestar um serviço excecional aos seus clientes.",
        publishedAt: "2024-01-15",
        author: "Alexandra Ribeiro",
        featuredImage: "/images/virtual-assistant-workspace.png",
        readingTime: 5,
      },
      {
        id: "2",
        title: lang === "en" ? "Complete Guide to E-commerce Setup" : "Guia Completo para Configuração de E-commerce",
        slug: "guia-completo-ecommerce-setup",
        excerpt:
          lang === "en"
            ? "Step-by-step guide to setting up your online store with all the essential tools and strategies for success."
            : "Guia passo-a-passo para configurar a sua loja online com todas as ferramentas e estratégias essenciais para o sucesso.",
        publishedAt: "2024-01-10",
        author: "Alexandra Ribeiro",
        featuredImage: "/images/digital-products-store.png",
        readingTime: 8,
      },
      {
        id: "3",
        title: lang === "en" ? "Social Media Automation with ManyChat" : "Automação de Redes Sociais com ManyChat",
        slug: "automacao-redes-sociais-manychat",
        excerpt:
          lang === "en"
            ? "Learn how to automate your social media interactions and improve customer engagement with ManyChat."
            : "Aprenda como automatizar as suas interações nas redes sociais e melhorar o envolvimento com os clientes usando ManyChat.",
        publishedAt: "2024-01-05",
        author: "Alexandra Ribeiro",
        featuredImage: "/images/instagram-manychat-automation.png",
        readingTime: 6,
      },
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [lang])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(lang === "en" ? "en-US" : "pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 max-w-md mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse max-w-2xl mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog-preview" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {dict?.title || (lang === "en" ? "Latest Blog Posts" : "Últimos Artigos do Blog")}
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {dict?.description ||
                (lang === "en"
                  ? "Stay updated with the latest tips, strategies, and insights about digital consulting and virtual assistance."
                  : "Mantenha-se atualizado com as últimas dicas, estratégias e insights sobre consultoria digital e assistência virtual.")}
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {lang === "en" ? "No articles available" : "Nenhum artigo disponível"}
              </h3>
              <p className="text-gray-600">
                {lang === "en" ? "Check back soon for new content!" : "Volte em breve para novo conteúdo!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className={`group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative h-48 bg-gray-100">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(post.publishedAt)}</span>
                      <Clock className="h-4 w-4 ml-4 mr-2" />
                      <span>
                        {post.readingTime} {lang === "en" ? "min read" : "min de leitura"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Por {post.author}</span>
                      <Link
                        href={`/${lang}/blog/${post.slug}`}
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                      >
                        {dict?.readMore || (lang === "en" ? "Read more" : "Ler mais")}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div
            className={`text-center mt-12 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {lang === "en" ? "View All Articles" : "Ver Todos os Artigos"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
