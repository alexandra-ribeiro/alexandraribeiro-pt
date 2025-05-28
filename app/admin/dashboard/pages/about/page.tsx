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
import { ChevronLeft, Save, ImageIcon, Plus, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import AuthCheck from "@/components/auth/auth-check"

export default function AboutEditPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("pt")

  // Exemplo de dados iniciais
  const [formData, setFormData] = useState({
    pt: {
      title: "Sobre Mim",
      description:
        "Conheça Alexandra Ribeiro, assistente virtual especializada em apoio administrativo e tecnológico para empresas em Portugal",
      heroTitle: {
        start: "Dizem que ser",
        highlight: "generalista",
        end: "é algo negativo",
      },
      heroSubtitle: "Eu não concordo.",
      heroPoints: [
        "Todos os empreendedores que me procuram estão à procura de alguém que possa desempenhar múltiplas funções.",
        "Precisam de ajuda com marketing online, tarefas administrativas e atendimento ao cliente.",
        "Precisam de alguém que simplesmente resolva os problemas e faça as coisas acontecerem.",
        "Não apenas uma VA. Uma parceira de negócios versátil.",
      ],
      storyTitle: "A minha história",
      storyParagraphs: [
        "Sou Alexandra Ribeiro, engenheira informática de formação e apaixonada por ajudar negócios a crescer de forma organizada e eficiente. Trago mais de 20 anos de experiência em consultoria tecnológica, apoio a projetos editoriais e gestão de e-commerce.",
        "Ao longo da minha carreira, trabalhei com dezenas de empresas em Portugal e internacionalmente, ajudando-as a otimizar processos, implementar sistemas e melhorar a comunicação com clientes.",
        "A minha abordagem combina conhecimento técnico com estratégias de marketing e comunicação, permitindo oferecer um serviço verdadeiramente completo aos meus clientes.",
        "Se chegou até aqui, provavelmente alguém lhe falou sobre mim, e isso é excelente! Nos últimos 10 anos tenho trabalhado nos bastidores, ajudando os meus clientes a brilharem, enquanto eu cuido de tudo o resto.",
      ],
      profileImage: "/images/alexandra-photo.jpeg",
    },
    en: {
      title: "About Me",
      description:
        "Meet Alexandra Ribeiro, a virtual assistant specialized in administrative and technological support for businesses in Portugal",
      heroTitle: {
        start: "They act like being a",
        highlight: "generalist",
        end: "is a bad thing",
      },
      heroSubtitle: "I don't get it.",
      heroPoints: [
        "Every business owner who comes my way is searching for a dream teammate who can fill as many hats as possible.",
        "They need help with online marketing, admin work, and client experience.",
        "They just need it taken care of... off their plate and finished.",
        "Not just a VA. A versatile business partner.",
      ],
      storyTitle: "My Story",
      storyParagraphs: [
        "I'm Alexandra Ribeiro, a computer engineer by training and passionate about helping businesses grow in an organized and efficient way. I bring over 20 years of experience in technology consulting, support for editorial projects, and e-commerce management.",
        "Throughout my career, I've worked with dozens of companies in Portugal and internationally, helping them optimize processes, implement systems, and improve customer communication.",
        "My approach combines technical knowledge with marketing and communication strategies, allowing me to offer a truly comprehensive service to my clients.",
        "If you stumbled on my page, someone probably told you about me and that is an excellent thing because for the last 10 years I have been behind the scenes promoting my clients.",
      ],
      profileImage: "/images/alexandra-photo.jpeg",
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

  const handleNestedInputChange = (lang: string, parent: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [lang]: {
        ...formData[lang as keyof typeof formData],
        [parent]: {
          ...formData[lang as keyof typeof formData][parent as keyof (typeof formData)[keyof typeof formData]],
          [field]: value,
        },
      },
    })
  }

  const handleArrayChange = (lang: string, field: string, index: number, value: string) => {
    const newArray = [
      ...formData[lang as keyof typeof formData][field as keyof (typeof formData)[keyof typeof formData]],
    ]
    newArray[index] = value

    setFormData({
      ...formData,
      [lang]: {
        ...formData[lang as keyof typeof formData],
        [field]: newArray,
      },
    })
  }

  const addArrayItem = (lang: string, field: string) => {
    const newArray = [
      ...formData[lang as keyof typeof formData][field as keyof (typeof formData)[keyof typeof formData]],
      "",
    ]

    setFormData({
      ...formData,
      [lang]: {
        ...formData[lang as keyof typeof formData],
        [field]: newArray,
      },
    })
  }

  const removeArrayItem = (lang: string, field: string, index: number) => {
    const newArray = [
      ...formData[lang as keyof typeof formData][field as keyof (typeof formData)[keyof typeof formData]],
    ]
    newArray.splice(index, 1)

    setFormData({
      ...formData,
      [lang]: {
        ...formData[lang as keyof typeof formData],
        [field]: newArray,
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
            <h2 className="text-lg font-medium">Editar Página Sobre</h2>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Página Sobre</CardTitle>
                      <CardDescription>Edite o conteúdo da página sobre em diferentes idiomas.</CardDescription>
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
                          <Label htmlFor="pt-title">Título da Página</Label>
                          <Input
                            id="pt-title"
                            value={formData.pt.title}
                            onChange={(e) => handleInputChange("pt", "title", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pt-description">Descrição (Meta)</Label>
                          <Textarea
                            id="pt-description"
                            value={formData.pt.description}
                            onChange={(e) => handleInputChange("pt", "description", e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="border-t pt-4 mt-6">
                          <h3 className="text-lg font-medium mb-4">Seção Hero</h3>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-heroTitle-start">Título (Início)</Label>
                              <Input
                                id="pt-heroTitle-start"
                                value={formData.pt.heroTitle.start}
                                onChange={(e) => handleNestedInputChange("pt", "heroTitle", "start", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-heroTitle-highlight">Título (Destaque)</Label>
                              <Input
                                id="pt-heroTitle-highlight"
                                value={formData.pt.heroTitle.highlight}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "heroTitle", "highlight", e.target.value)
                                }
                                className="border-accent"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-heroTitle-end">Título (Fim)</Label>
                              <Input
                                id="pt-heroTitle-end"
                                value={formData.pt.heroTitle.end}
                                onChange={(e) => handleNestedInputChange("pt", "heroTitle", "end", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <Label htmlFor="pt-heroSubtitle">Subtítulo</Label>
                            <Input
                              id="pt-heroSubtitle"
                              value={formData.pt.heroSubtitle}
                              onChange={(e) => handleInputChange("pt", "heroSubtitle", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <Label>Pontos Principais</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addArrayItem("pt", "heroPoints")}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Adicionar
                              </Button>
                            </div>

                            {formData.pt.heroPoints.map((point, index) => (
                              <div key={index} className="flex gap-2 items-start">
                                <Textarea
                                  value={point}
                                  onChange={(e) => handleArrayChange("pt", "heroPoints", index, e.target.value)}
                                  className="flex-1"
                                  rows={2}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeArrayItem("pt", "heroPoints", index)}
                                  className="text-red-500 hover:text-red-700"
                                  disabled={formData.pt.heroPoints.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-4 mt-6">
                          <h3 className="text-lg font-medium mb-4">Seção História</h3>

                          <div className="space-y-2 mb-4">
                            <Label htmlFor="pt-storyTitle">Título da História</Label>
                            <Input
                              id="pt-storyTitle"
                              value={formData.pt.storyTitle}
                              onChange={(e) => handleInputChange("pt", "storyTitle", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <Label>Parágrafos da História</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addArrayItem("pt", "storyParagraphs")}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Adicionar
                              </Button>
                            </div>

                            {formData.pt.storyParagraphs.map((paragraph, index) => (
                              <div key={index} className="flex gap-2 items-start">
                                <Textarea
                                  value={paragraph}
                                  onChange={(e) => handleArrayChange("pt", "storyParagraphs", index, e.target.value)}
                                  className="flex-1"
                                  rows={3}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeArrayItem("pt", "storyParagraphs", index)}
                                  className="text-red-500 hover:text-red-700"
                                  disabled={formData.pt.storyParagraphs.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pt-profileImage">Imagem de Perfil</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="pt-profileImage"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange("pt", "profileImage", e)}
                              className="flex-1"
                            />
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                              {formData.pt.profileImage ? (
                                <img
                                  src={formData.pt.profileImage || "/placeholder.svg"}
                                  alt="Profile preview"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Imagem atual: {formData.pt.profileImage}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="en" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="en-title">Page Title</Label>
                          <Input
                            id="en-title"
                            value={formData.en.title}
                            onChange={(e) => handleInputChange("en", "title", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="en-description">Description (Meta)</Label>
                          <Textarea
                            id="en-description"
                            value={formData.en.description}
                            onChange={(e) => handleInputChange("en", "description", e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="border-t pt-4 mt-6">
                          <h3 className="text-lg font-medium mb-4">Hero Section</h3>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="en-heroTitle-start">Title (Start)</Label>
                              <Input
                                id="en-heroTitle-start"
                                value={formData.en.heroTitle.start}
                                onChange={(e) => handleNestedInputChange("en", "heroTitle", "start", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="en-heroTitle-highlight">Title (Highlight)</Label>
                              <Input
                                id="en-heroTitle-highlight"
                                value={formData.en.heroTitle.highlight}
                                onChange={(e) =>
                                  handleNestedInputChange("en", "heroTitle", "highlight", e.target.value)
                                }
                                className="border-accent"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="en-heroTitle-end">Title (End)</Label>
                              <Input
                                id="en-heroTitle-end"
                                value={formData.en.heroTitle.end}
                                onChange={(e) => handleNestedInputChange("en", "heroTitle", "end", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <Label htmlFor="en-heroSubtitle">Subtitle</Label>
                            <Input
                              id="en-heroSubtitle"
                              value={formData.en.heroSubtitle}
                              onChange={(e) => handleInputChange("en", "heroSubtitle", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <Label>Main Points</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addArrayItem("en", "heroPoints")}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add
                              </Button>
                            </div>

                            {formData.en.heroPoints.map((point, index) => (
                              <div key={index} className="flex gap-2 items-start">
                                <Textarea
                                  value={point}
                                  onChange={(e) => handleArrayChange("en", "heroPoints", index, e.target.value)}
                                  className="flex-1"
                                  rows={2}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeArrayItem("en", "heroPoints", index)}
                                  className="text-red-500 hover:text-red-700"
                                  disabled={formData.en.heroPoints.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-4 mt-6">
                          <h3 className="text-lg font-medium mb-4">Story Section</h3>

                          <div className="space-y-2 mb-4">
                            <Label htmlFor="en-storyTitle">Story Title</Label>
                            <Input
                              id="en-storyTitle"
                              value={formData.en.storyTitle}
                              onChange={(e) => handleInputChange("en", "storyTitle", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <Label>Story Paragraphs</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addArrayItem("en", "storyParagraphs")}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add
                              </Button>
                            </div>

                            {formData.en.storyParagraphs.map((paragraph, index) => (
                              <div key={index} className="flex gap-2 items-start">
                                <Textarea
                                  value={paragraph}
                                  onChange={(e) => handleArrayChange("en", "storyParagraphs", index, e.target.value)}
                                  className="flex-1"
                                  rows={3}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeArrayItem("en", "storyParagraphs", index)}
                                  className="text-red-500 hover:text-red-700"
                                  disabled={formData.en.storyParagraphs.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="en-profileImage">Profile Image</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="en-profileImage"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange("en", "profileImage", e)}
                              className="flex-1"
                            />
                            <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                              {formData.en.profileImage ? (
                                <img
                                  src={formData.en.profileImage || "/placeholder.svg"}
                                  alt="Profile preview"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Current image: {formData.en.profileImage}</p>
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
