"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Save, ImageIcon, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import AuthCheck from "@/components/auth/auth-check"
import { saveContent, getContent, debugAllContent } from "@/lib/simple-storage"

export default function HomeEditPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("pt")

  // Default data
  const defaultData = {
    pt: {
      headline: "A sua parceira virtual",
      subheadline: "Apoio especializado para empresas de tecnologia",
      cta: "Ver serviços",
      whatIsVaTitle: "Mas afinal, o que faz uma Assistente Virtual?",
      whatIsVaHighlight:
        "Sem encargos com segurança social, sem espaço de escritório adicional, sem preocupações de recrutamento. Apenas resultados práticos, quando precisa.",
      heroImage: "/images/hero-background.jpg",
    },
    en: {
      headline: "Your virtual partner",
      subheadline: "Expert support for tech businesses",
      cta: "View services",
      whatIsVaTitle: "But after all, what does a Virtual Assistant do?",
      whatIsVaHighlight:
        "No social security charges, no additional office space, no recruitment concerns. Just practical results, when you need them.",
      heroImage: "/images/hero-background.jpg",
    },
  }

  const [formData, setFormData] = useState(defaultData)

  // Load existing content on component mount
  useEffect(() => {
    const ptContent = getContent("home_pt")
    const enContent = getContent("home_en")

    if (ptContent) {
      setFormData((prev) => ({
        ...prev,
        pt: ptContent,
      }))
    }

    if (enContent) {
      setFormData((prev) => ({
        ...prev,
        en: enContent,
      }))
    }

    // Debug all content in localStorage
    debugAllContent()
  }, [])

  const handleInputChange = (lang: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [lang]: {
        ...formData[lang as keyof typeof formData],
        [field]: value,
      },
    })
  }

  const handleImageChange = (lang: string, field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Em uma implementação real, você enviaria o arquivo para um servidor
      // e atualizaria o URL da imagem após o upload
      toast({
        title: "Upload de imagem",
        description: "Esta funcionalidade será implementada em breve.",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Save content to localStorage with simple keys
      saveContent("home_pt", formData.pt)
      saveContent("home_en", formData.en)

      // Debug all content after saving
      debugAllContent()

      setIsLoading(false)
      toast({
        title: "Alterações salvas",
        description: "As alterações foram salvas com sucesso no armazenamento local.",
      })
    } catch (error) {
      console.error("Error saving data:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações. Por favor, tente novamente.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleForceRefresh = () => {
    // Force a page refresh to update content
    window.location.reload()
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-gray-100">
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="bg-white border-b h-16 flex items-center px-6">
            <Link href="/admin/dashboard" className="flex items-center text-gray-700 mr-6">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Voltar</span>
            </Link>
            <h2 className="text-lg font-medium">Editar Página Inicial</h2>
            <div className="ml-auto">
              <Button variant="outline" size="sm" onClick={handleForceRefresh} className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar Página
              </Button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Página Inicial</CardTitle>
                      <CardDescription>
                        Edite o conteúdo da página inicial em diferentes idiomas.
                        <div className="mt-1 text-sm text-amber-600">
                          As alterações são salvas localmente no seu navegador.
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="pt">Português</TabsTrigger>
                        <TabsTrigger value="en">English</TabsTrigger>
                      </TabsList>

                      <TabsContent value="pt" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="pt-headline">Título Principal</Label>
                          <Input
                            id="pt-headline"
                            value={formData.pt.headline}
                            onChange={(e) => handleInputChange("pt", "headline", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pt-subheadline">Subtítulo</Label>
                          <Input
                            id="pt-subheadline"
                            value={formData.pt.subheadline}
                            onChange={(e) => handleInputChange("pt", "subheadline", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pt-cta">Texto do Botão</Label>
                          <Input
                            id="pt-cta"
                            value={formData.pt.cta}
                            onChange={(e) => handleInputChange("pt", "cta", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pt-whatIsVaTitle">Título da Seção "O que é uma VA"</Label>
                          <Input
                            id="pt-whatIsVaTitle"
                            value={formData.pt.whatIsVaTitle}
                            onChange={(e) => handleInputChange("pt", "whatIsVaTitle", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pt-whatIsVaHighlight">Texto de Destaque</Label>
                          <Textarea
                            id="pt-whatIsVaHighlight"
                            value={formData.pt.whatIsVaHighlight}
                            onChange={(e) => handleInputChange("pt", "whatIsVaHighlight", e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pt-heroImage">Imagem de Fundo do Hero</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="pt-heroImage"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange("pt", "heroImage", e)}
                              className="flex-1"
                            />
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                              {formData.pt.heroImage ? (
                                <img
                                  src={formData.pt.heroImage || "/placeholder.svg"}
                                  alt="Hero preview"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Imagem atual: {formData.pt.heroImage}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="en" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="en-headline">Main Title</Label>
                          <Input
                            id="en-headline"
                            value={formData.en.headline}
                            onChange={(e) => handleInputChange("en", "headline", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="en-subheadline">Subtitle</Label>
                          <Input
                            id="en-subheadline"
                            value={formData.en.subheadline}
                            onChange={(e) => handleInputChange("en", "subheadline", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="en-cta">Button Text</Label>
                          <Input
                            id="en-cta"
                            value={formData.en.cta}
                            onChange={(e) => handleInputChange("en", "cta", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="en-whatIsVaTitle">Title of "What is a VA" Section</Label>
                          <Input
                            id="en-whatIsVaTitle"
                            value={formData.en.whatIsVaTitle}
                            onChange={(e) => handleInputChange("en", "whatIsVaTitle", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="en-whatIsVaHighlight">Highlight Text</Label>
                          <Textarea
                            id="en-whatIsVaHighlight"
                            value={formData.en.whatIsVaHighlight}
                            onChange={(e) => handleInputChange("en", "whatIsVaHighlight", e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="en-heroImage">Hero Background Image</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="en-heroImage"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange("en", "heroImage", e)}
                              className="flex-1"
                            />
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                              {formData.en.heroImage ? (
                                <img
                                  src={formData.en.heroImage || "/placeholder.svg"}
                                  alt="Hero preview"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Current image: {formData.en.heroImage}</p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex gap-4">
                      <Button type="submit" disabled={isLoading} className="flex items-center">
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Salvar Alterações
                          </>
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          // Log current localStorage content to console
                          debugAllContent()
                          toast({
                            title: "Debug",
                            description: "Informações de depuração foram registradas no console do navegador.",
                          })
                        }}
                      >
                        Debug
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </AuthCheck>
  )
}
