"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, Save, ImageIcon, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AuthCheck from "@/components/auth/auth-check"
import WysiwygEditor from "@/components/admin/wysiwyg-editor"
import { saveArticle } from "@/lib/blog-storage"

export default function NewBlogArticlePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    image: "",
    published: true, // Default to published
    language: "pt",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // Clear error when user makes changes
    setError(null)

    // Generate slug automatically from title
    if (field === "title" && typeof value === "string") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
        .trim()

      setFormData((prev) => ({
        ...prev,
        slug,
      }))
    }
  }

  const handleEditorChange = (value: string) => {
    setFormData({
      ...formData,
      content: value,
    })
    setError(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Read the file as a data URL (base64)
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageDataUrl = event.target.result as string
        setImagePreview(imageDataUrl)
        setFormData({
          ...formData,
          image: imageDataUrl,
        })
        toast({
          title: "Imagem carregada",
          description: "A imagem foi carregada com sucesso.",
        })
      }
    }
    reader.onerror = () => {
      toast({
        title: "Erro ao carregar imagem",
        description: "Não foi possível carregar a imagem. Por favor, tente novamente.",
        variant: "destructive",
      })
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setFormData({
      ...formData,
      image: "",
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Basic validation
      if (!formData.title || !formData.slug || !formData.description) {
        setError("Por favor, preencha todos os campos obrigatórios.")
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Format the date for display
      const displayDate = new Date(formData.date).toLocaleDateString(formData.language === "pt" ? "pt-BR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      console.log("Submitting blog article:", {
        ...formData,
        date: displayDate,
      })

      // Prepare the article data
      const articleData = {
        ...formData,
        _id: `local_${Date.now()}`, // Generate a local ID
        date: displayDate, // Use the formatted date for display
      }

      // Save to localStorage - this will trigger the update events
      const savedArticle = saveArticle(articleData)
      console.log("Article saved to localStorage:", savedArticle)

      toast({
        title: "Artigo criado",
        description: "O artigo foi criado com sucesso e salvo localmente.",
      })

      // Redirect to the blog management page
      router.push("/admin/dashboard/pages/blog")
    } catch (error) {
      console.error("Error saving article:", error)
      setError(
        error instanceof Error ? error.message : "Ocorreu um erro ao salvar o artigo. Por favor, tente novamente.",
      )
      toast({
        title: "Erro ao salvar",
        description:
          error instanceof Error ? error.message : "Ocorreu um erro ao salvar o artigo. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
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
            <Link href="/admin/dashboard/pages/blog" className="flex items-center text-gray-700 mr-6">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Voltar</span>
            </Link>
            <h2 className="text-lg font-medium">Novo Artigo</h2>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Criar Novo Artigo</CardTitle>
                  <CardDescription>Preencha os campos abaixo para criar um novo artigo no blog.</CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Erro</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => handleInputChange("slug", e.target.value)}
                          required
                        />
                        <p className="text-xs text-gray-500">
                          O slug é gerado automaticamente a partir do título, mas pode ser editado.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">Data de Publicação</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <select
                          id="language"
                          className="w-full p-2 border rounded-md"
                          value={formData.language}
                          onChange={(e) => handleInputChange("language", e.target.value)}
                        >
                          <option value="pt">Português</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Imagem de Capa</Label>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                          />
                        </div>
                        <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                          {imagePreview ? (
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {imagePreview && (
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500">Imagem carregada</p>
                          <Button type="button" variant="ghost" size="sm" onClick={handleRemoveImage}>
                            Remover
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Conteúdo *</Label>
                      <WysiwygEditor id="content" value={formData.content} onChange={handleEditorChange} />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => handleInputChange("published", checked)}
                      />
                      <Label htmlFor="published">Publicar imediatamente</Label>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Link href="/admin/dashboard/pages/blog">
                        <Button type="button" variant="outline">
                          Cancelar
                        </Button>
                      </Link>
                      <Button type="submit" disabled={isLoading} className="flex items-center">
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Salvar Artigo
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
