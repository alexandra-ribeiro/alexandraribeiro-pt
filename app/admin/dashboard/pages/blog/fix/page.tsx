"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import AuthCheck from "@/components/auth/auth-check"
import { getAllArticles, saveArticle, type BlogArticle } from "@/lib/blog-storage"

export default function FixBlogPostsPage() {
  const [isFixing, setIsFixing] = useState(false)
  const [fixed, setFixed] = useState(false)
  const [articles, setArticles] = useState<BlogArticle[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const allArticles = getAllArticles()
      setArticles(allArticles)
    }
  }, [])

  const handleFixPosts = async () => {
    if (window.confirm("Tem certeza que deseja corrigir os artigos do blog?")) {
      setIsFixing(true)

      try {
        // Get all articles
        const allArticles = getAllArticles()

        // Fix each article by re-saving it
        for (const article of allArticles) {
          // Ensure it has the correct structure
          const fixedArticle: BlogArticle = {
            ...article,
            published: article.published === false ? false : true, // Default to true if undefined
            _id: article._id || `fixed_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            createdAt: article.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }

          // Save the fixed article
          saveArticle(fixedArticle)
        }

        toast({
          title: "Artigos corrigidos",
          description: `${allArticles.length} artigos foram corrigidos com sucesso.`,
        })

        setFixed(true)
      } catch (error) {
        console.error("Error fixing blog posts:", error)
        toast({
          title: "Erro ao corrigir",
          description: "Não foi possível corrigir os artigos do blog. Por favor, tente novamente.",
          variant: "destructive",
        })
      } finally {
        setIsFixing(false)
      }
    }
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-gray-100">
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="bg-white border-b h-16 flex items-center justify-between px-6">
            <h2 className="text-lg font-medium">Corrigir Artigos do Blog</h2>
            <Link href="/admin/dashboard/pages/blog">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Corrigir Artigos do Blog</CardTitle>
                <CardDescription>Esta ferramenta irá corrigir problemas comuns com os artigos do blog.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Se você estiver enfrentando problemas de sincronização entre o painel administrativo e o site
                    público, corrigir os artigos pode ajudar a resolver o problema.
                  </p>
                  <p>
                    Esta ferramenta irá verificar e corrigir problemas comuns com os artigos do blog, como campos
                    ausentes ou valores incorretos.
                  </p>
                  <p>
                    Artigos encontrados: <strong>{articles.length}</strong>
                  </p>
                  {fixed ? (
                    <div className="flex items-center text-green-600 mt-4">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Artigos corrigidos com sucesso!
                    </div>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handleFixPosts}
                      disabled={isFixing || articles.length === 0}
                      className="mt-4"
                    >
                      {isFixing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Corrigindo...
                        </>
                      ) : (
                        "Corrigir Artigos"
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Artigos Encontrados</CardTitle>
              </CardHeader>
              <CardContent>
                {articles.length === 0 ? (
                  <p className="text-gray-500">Nenhum artigo encontrado.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Título</th>
                          <th className="text-left py-3 px-4">Idioma</th>
                          <th className="text-left py-3 px-4">Publicado</th>
                          <th className="text-left py-3 px-4">ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.map((article) => (
                          <tr key={article._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{article.title}</td>
                            <td className="py-3 px-4">{article.language}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  article.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {article.published ? "Publicado" : "Rascunho"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-xs text-gray-500">{article._id}</td>
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
      </div>
    </AuthCheck>
  )
}
