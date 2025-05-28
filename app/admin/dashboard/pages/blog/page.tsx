"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, RefreshCw, Info, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import AuthCheck from "@/components/auth/auth-check"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import BlogDebug from "@/components/blog-debug"

// Contentful space information
const CONTENTFUL_SPACE_ID = "s6yvdch48olm"
const CONTENTFUL_SPACE_URL = `https://app.contentful.com/spaces/${CONTENTFUL_SPACE_ID}`
const CONTENTFUL_CONTENT_URL = `${CONTENTFUL_SPACE_URL}/entries`

export default function BlogManagementPage() {
  const [showDebug, setShowDebug] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [blogPosts, setBlogPosts] = useState<any[]>([])

  // Fetch recent blog posts from Contentful for preview
  const fetchRecentPosts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/contentful/posts?limit=5")
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      } else {
        throw new Error("Failed to fetch blog posts")
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      toast({
        title: "Erro ao carregar posts",
        description: "Não foi possível carregar os posts recentes do Contentful.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecentPosts()
  }, [])

  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-gray-100">
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="bg-white border-b h-16 flex items-center justify-between px-6">
            <h2 className="text-lg font-medium">Gerenciar Blog</h2>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowDebug(!showDebug)} className="flex items-center">
                {showDebug ? "Esconder Debug" : "Mostrar Debug"}
              </Button>
              <Button variant="outline" onClick={fetchRecentPosts} className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              <Link href={CONTENTFUL_CONTENT_URL} target="_blank">
                <Button className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir Contentful
                </Button>
              </Link>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Gerenciamento de Blog via Contentful</CardTitle>
                <CardDescription>Os artigos do blog são gerenciados através da plataforma Contentful</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Informação Importante</AlertTitle>
                  <AlertDescription>
                    Este site utiliza o Contentful como sistema de gerenciamento de conteúdo para o blog. Para
                    adicionar, editar ou remover artigos do blog, você deve acessar diretamente o painel do Contentful.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Acesso ao Contentful</h3>
                    <p className="mb-4">
                      Clique no botão abaixo para acessar o painel do Contentful e gerenciar os artigos do blog:
                    </p>
                    <div className="space-y-3">
                      <Link href={CONTENTFUL_SPACE_URL} target="_blank">
                        <Button variant="outline" className="w-full flex justify-between items-center">
                          <span>Acessar Espaço Contentful</span>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={CONTENTFUL_CONTENT_URL} target="_blank">
                        <Button variant="default" className="w-full flex justify-between items-center">
                          <span>Gerenciar Artigos do Blog</span>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Informações do Espaço</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="mb-2">
                        <strong>ID do Espaço:</strong> {CONTENTFUL_SPACE_ID}
                      </p>
                      <p className="mb-2">
                        <strong>Tipo de Conteúdo:</strong> blogPost
                      </p>
                      <p>
                        <strong>Ambiente:</strong> master
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Posts Recentes</CardTitle>
                <CardDescription>Visualize os posts mais recentes publicados no Contentful</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum post encontrado no Contentful.</p>
                    <p className="text-gray-500 mt-2">
                      Clique em "Gerenciar Artigos do Blog" para adicionar seu primeiro artigo.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Título</th>
                          <th className="text-left py-3 px-4">Data</th>
                          <th className="text-left py-3 px-4">Idioma</th>
                          <th className="text-right py-3 px-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogPosts.map((post, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{post.fields?.title || "Sem título"}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {post.fields?.slug || "sem-slug"}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {post.fields?.publishedDate
                                ? new Date(post.fields.publishedDate).toLocaleDateString()
                                : "Sem data"}
                            </td>
                            <td className="py-3 px-4">{post.fields?.language || "pt"}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <Link href={`${CONTENTFUL_CONTENT_URL}/${post.sys?.id}`} target="_blank">
                                  <Button variant="outline" size="sm">
                                    <ExternalLink className="w-4 h-4" />
                                    <span className="sr-only">Editar no Contentful</span>
                                  </Button>
                                </Link>
                                <Link
                                  href={`/${post.fields?.language || "pt"}/blog/${post.fields?.slug || "sem-slug"}`}
                                  target="_blank"
                                >
                                  <Button variant="outline" size="sm">
                                    <Info className="w-4 h-4" />
                                    <span className="sr-only">Ver no site</span>
                                  </Button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
        {showDebug && <BlogDebug />}
      </div>
    </AuthCheck>
  )
}
