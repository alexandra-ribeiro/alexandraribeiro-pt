"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import AuthCheck from "@/components/auth/auth-check"
import WysiwygEditor from "@/components/admin/wysiwyg-editor"

export default function ServicesEditPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("pt")

  // Exemplo de dados iniciais
  const [formData, setFormData] = useState({
    pt: {
      title: "Serviços personalizados para o seu negócio",
      subtitle:
        "Soluções flexíveis que se adaptam às suas necessidades específicas, permitindo que você foque no crescimento do seu negócio.",
      content:
        "<p>Com mais de 20 anos de experiência em tecnologia e gestão, ofereço um serviço que vai além das tarefas básicas de uma assistente virtual. Minha abordagem combina conhecimento técnico, visão estratégica e execução prática para entregar resultados reais para o seu negócio.</p>",
    },
    en: {
      title: "Personalized services for your business",
      subtitle: "Flexible solutions that adapt to your specific needs, allowing you to focus on growing your business.",
      content:
        "<p>With over 20 years of experience in technology and management, I offer a service that goes beyond the basic tasks of a virtual assistant. My approach combines technical knowledge, strategic vision, and practical execution to deliver real results for your business.</p>",
    },
  })

  const handleInputChange = (lang: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [lang]: {
        ...formData[lang as keyof typeof formData],
        [field]: value,
      },
    })
  }

  const handleEditorChange = (lang: string, value: string) => {
    setFormData({
      ...formData,
      [lang]: {
        ...formData[lang as keyof typeof formData],
        content: value,
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulando uma chamada de API para salvar os dados
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Alterações salvas",
          description: "As alterações foram salvas com sucesso.",
        })
      }, 1500)
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
            <h2 className="text-lg font-medium">Editar Página de Serviços</h2>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Página de Serviços</CardTitle>
                      <CardDescription>Edite o conteúdo da página de serviços em diferentes idiomas.</CardDescription>
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
                          <Label htmlFor="pt-title">Título</Label>
                          <Input
                            id="pt-title"
                            value={formData.pt.title}
                            onChange={(e) => handleInputChange("pt", "title", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pt-subtitle">Subtítulo</Label>
                          <Textarea
                            id="pt-subtitle"
                            value={formData.pt.subtitle}
                            onChange={(e) => handleInputChange("pt", "subtitle", e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pt-content">Conteúdo</Label>
                          <WysiwygEditor
                            id="pt-content"
                            value={formData.pt.content}
                            onChange={(value) => handleEditorChange("pt", value)}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="en" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="en-title">Title</Label>
                          <Input
                            id="en-title"
                            value={formData.en.title}
                            onChange={(e) => handleInputChange("en", "title", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="en-subtitle">Subtitle</Label>
                          <Textarea
                            id="en-subtitle"
                            value={formData.en.subtitle}
                            onChange={(e) => handleInputChange("en", "subtitle", e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="en-content">Content</Label>
                          <WysiwygEditor
                            id="en-content"
                            value={formData.en.content}
                            onChange={(value) => handleEditorChange("en", value)}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6">
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
