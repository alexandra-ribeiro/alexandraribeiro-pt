"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { ChevronLeft, Loader2, Save, Eye } from "lucide-react"
import WysiwygEditor from "@/components/admin/wysiwyg-editor"
import AuthCheck from "@/components/auth/auth-check"
import { getArticleById, updateArticle, saveArticle, type BlogArticle } from "@/lib/blog-storage"

// Form schema
const formSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  slug: z.string().min(1, "O slug é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  date: z.string().min(1, "A data é obrigatória"),
  image: z.string().optional(),
  published: z.boolean().default(false),
  language: z.enum(["pt", "en"]),
  content: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [article, setArticle] = useState<BlogArticle | null>(null)
  const [isSample, setIsSample] = useState(false)

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      date: "",
      image: "",
      published: false,
      language: "pt",
      content: "",
    },
  })

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true)
        const id = params.id

        // Check if it's a sample article
        const isSampleArticle = id.startsWith("sample_")
        setIsSample(isSampleArticle)

        // Get article from localStorage
        const article = getArticleById(id)

        if (article) {
          console.log("Found article in localStorage:", article)
          setArticle(article)

          // Set form values
          form.reset({
            title: article.title,
            slug: article.slug,
            description: article.description,
            date: article.date,
            image: article.image || "",
            published: article.published,
            language: article.language as "pt" | "en",
            content: article.content || "",
          })

          // Set image preview
          if (article.image) {
            setImagePreview(article.image)
          }
        } else {
          // If not found in localStorage, try to fetch from API
          console.log("Article not found in localStorage, trying API...")
          try {
            const response = await fetch(`/api/blog/${id}`)
            if (response.ok) {
              const data = await response.json()
              console.log("Found article in API:", data)
              setArticle(data)

              // Set form values
              form.reset({
                title: data.title,
                slug: data.slug,
                description: data.description,
                date: data.date,
                image: data.image || "",
                published: data.published,
                language: data.language as "pt" | "en",
                content: data.content || "",
              })

              // Set image preview
              if (data.image) {
                setImagePreview(data.image)
              }
            } else {
              throw new Error("Article not found")
            }
          } catch (apiError) {
            console.error("Error fetching from API:", apiError)
            toast({
              title: "Artigo não encontrado",
              description: "Não foi possível encontrar o artigo solicitado.",
              variant: "destructive",
            })
            router.push("/admin/dashboard/pages/blog")
          }
        }
      } catch (error) {
        console.error("Error loading article:", error)
        toast({
          title: "Erro ao carregar artigo",
          description: "Não foi possível carregar os dados do artigo. Por favor, tente novamente.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [params.id, router, form])

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSaving(true)

      // Create updated article object
      const updatedArticle: BlogArticle = {
        _id: isSample ? `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}` : article?._id || params.id,
        ...values,
        image: values.image || "",
        createdAt: article?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // If it's a sample article, save as a new article
      if (isSample) {
        console.log("Saving sample article as new:", updatedArticle)
        const savedArticle = saveArticle(updatedArticle)
        console.log("Saved as new article:", savedArticle)

        toast({
          title: "Artigo salvo",
          description: "O artigo de exemplo foi salvo como um novo artigo personalizado.",
        })
      } else {
        // Update existing article
        console.log("Updating existing article:", updatedArticle)
        const savedArticle = updateArticle(updatedArticle)
        console.log("Updated article:", savedArticle)

        toast({
          title: "Artigo atualizado",
          description: "O artigo foi atualizado com sucesso.",
        })
      }

      // Try to update in API as well (but don't wait for it)
      fetch(`/api/blog/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArticle),
      }).catch((apiError) => {
        console.error("Error updating in API (non-blocking):", apiError)
      })

      // Redirect to blog list
      router.push("/admin/dashboard/pages/blog")
    } catch (error) {
      console.error("Error saving article:", error)
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o artigo. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        form.setValue("image", base64String)
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image
  const handleRemoveImage = () => {
    form.setValue("image", "")
    setImagePreview(null)
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-gray-100">
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="bg-white border-b h-16 flex items-center justify-between px-6">
            <div className="flex items-center">
              <Link href="/admin/dashboard/pages/blog" className="flex items-center text-gray-700 mr-6">
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Voltar</span>
              </Link>
              <h2 className="text-lg font-medium">{isSample ? "Editar Artigo de Exemplo" : "Editar Artigo"}</h2>
              {isSample && (
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Será salvo como novo artigo
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              {article && (
                <Link href={`/${article.language}/blog/${article.slug}`} target="_blank">
                  <Button variant="outline" className="flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                </Link>
              )}
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSaving}
                className="flex items-center"
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Salvar
              </Button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                      <TabsTrigger value="content">Conteúdo</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left column - Basic info */}
                        <div className="md:col-span-2 space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Informações do Artigo</CardTitle>
                              <CardDescription>Edite as informações básicas do artigo</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Digite o título do artigo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                      <Input placeholder="titulo-do-artigo" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      URL amigável do artigo (sem espaços, acentos ou caracteres especiais)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Digite uma breve descrição do artigo"
                                        className="min-h-[100px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="date"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Data</FormLabel>
                                      <FormControl>
                                        <Input placeholder="18 de abril, 2023" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="language"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Idioma</FormLabel>
                                      <FormControl>
                                        <select
                                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                          {...field}
                                        >
                                          <option value="pt">Português</option>
                                          <option value="en">English</option>
                                        </select>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <FormField
                                control={form.control}
                                name="published"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Publicado</FormLabel>
                                      <FormDescription>Ative para tornar o artigo visível no site</FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </CardContent>
                          </Card>
                        </div>

                        {/* Right column - Image */}
                        <div className="space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Imagem do Artigo</CardTitle>
                              <CardDescription>Adicione uma imagem para o artigo</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                      />
                                    </FormControl>
                                    <div className="space-y-4">
                                      {imagePreview ? (
                                        <div className="relative">
                                          <img
                                            src={imagePreview || "/placeholder.svg"}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-md"
                                          />
                                          <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={handleRemoveImage}
                                          >
                                            Remover
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                          <div className="flex justify-center">
                                            <label
                                              htmlFor="image-upload"
                                              className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                                            >
                                              Selecionar Imagem
                                            </label>
                                          </div>
                                          <p className="text-sm text-gray-500 mt-2">Recomendado: 1200 x 630 pixels</p>
                                        </div>
                                      )}
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="content">
                      <Card>
                        <CardHeader>
                          <CardTitle>Conteúdo do Artigo</CardTitle>
                          <CardDescription>Edite o conteúdo completo do artigo</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <WysiwygEditor value={field.value || ""} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </form>
              </Form>
            )}
          </main>
        </div>
      </div>
    </AuthCheck>
  )
}
