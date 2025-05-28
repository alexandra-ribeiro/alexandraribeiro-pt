"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import AuthCheck from "@/components/auth/auth-check"
import { clearBlogStorage } from "@/lib/blog-storage"

export default function ClearBlogStoragePage() {
  const [isClearing, setIsClearing] = useState(false)
  const [isReloading, setIsReloading] = useState(false)

  const handleClearStorage = async () => {
    if (
      window.confirm("Tem certeza que deseja limpar todo o armazenamento do blog? Esta ação não pode ser desfeita.")
    ) {
      setIsClearing(true)

      try {
        const success = clearBlogStorage()

        if (success) {
          toast({
            title: "Armazenamento limpo",
            description: "O armazenamento do blog foi limpo com sucesso.",
          })
        } else {
          throw new Error("Failed to clear blog storage")
        }
      } catch (error) {
        console.error("Error clearing blog storage:", error)
        toast({
          title: "Erro ao limpar",
          description: "Não foi possível limpar o armazenamento do blog. Por favor, tente novamente.",
          variant: "destructive",
        })
      } finally {
        setIsClearing(false)
      }
    }
  }

  const handleReloadPage = () => {
    setIsReloading(true)
    window.location.reload()
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-gray-100">
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="bg-white border-b h-16 flex items-center justify-between px-6">
            <h2 className="text-lg font-medium">Limpar Armazenamento do Blog</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReloadPage} disabled={isReloading}>
                {isReloading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Recarregando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Recarregar Página
                  </>
                )}
              </Button>
              <Link href="/admin/dashboard/pages/blog">
                <Button variant="outline" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Card>
              <CardHeader>
                <CardTitle>Limpar Armazenamento do Blog</CardTitle>
                <CardDescription>
                  Esta ação irá remover todos os artigos do blog armazenados localmente. Use com cuidado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-red-500">
                    Atenção: Esta ação irá remover todos os artigos do blog armazenados localmente. Esta ação não pode
                    ser desfeita.
                  </p>
                  <p>
                    Se você estiver enfrentando problemas de sincronização entre o painel administrativo e o site
                    público, limpar o armazenamento pode ajudar a resolver o problema.
                  </p>
                  <p>
                    Após limpar o armazenamento, você precisará adicionar novamente os artigos do blog que deseja exibir
                    no site.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Importante:</strong> Após limpar o armazenamento, recarregue a página principal do
                          site para ver as mudanças.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Button variant="destructive" onClick={handleClearStorage} disabled={isClearing}>
                      {isClearing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Limpando...
                        </>
                      ) : (
                        "Limpar Armazenamento"
                      )}
                    </Button>
                    <Link href="/" target="_blank">
                      <Button variant="outline">Abrir Site Principal</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </AuthCheck>
  )
}
