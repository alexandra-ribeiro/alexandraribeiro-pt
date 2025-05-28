"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Plus, Trash, Edit, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import AuthCheck from "@/components/auth/auth-check"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"

// FAQ type definition
type FAQ = {
  id: string
  question: {
    pt: string
    en: string
  }
  answer: {
    pt: string
    en: string
  }
  isActive: boolean
}

export default function FAQManagementPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("pt")
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentFaq, setCurrentFaq] = useState<FAQ | null>(null)

  // Initial form state for new FAQ
  const initialFormState = {
    question: {
      pt: "",
      en: "",
    },
    answer: {
      pt: "",
      en: "",
    },
    isActive: true,
  }

  const [formData, setFormData] = useState(initialFormState)

  // Load FAQs on component mount
  useEffect(() => {
    // In a real application, this would fetch from an API
    // For now, we'll use mock data
    const mockFaqs: FAQ[] = [
      {
        id: "1",
        question: {
          pt: "Quais são os seus horários de disponibilidade?",
          en: "What are your availability hours?",
        },
        answer: {
          pt: "Estou disponível de segunda a sexta-feira, das 9h às 18h (horário de Portugal). Para projetos urgentes, posso oferecer disponibilidade estendida mediante acordo prévio.",
          en: "I'm available Monday through Friday, from 9 AM to 6 PM (Portugal time). For urgent projects, I can offer extended availability by prior arrangement.",
        },
        isActive: true,
      },
      {
        id: "2",
        question: {
          pt: "Como funciona o modelo de cobrança?",
          en: "How does your pricing model work?",
        },
        answer: {
          pt: "Trabalho com dois modelos principais: pacotes de horas mensais (recomendado para suporte contínuo) e projetos específicos com escopo definido. Os valores são personalizados de acordo com as necessidades de cada cliente.",
          en: "I work with two main models: monthly hour packages (recommended for ongoing support) and specific projects with defined scope. Rates are customized according to each client's needs.",
        },
        isActive: true,
      },
      {
        id: "3",
        question: {
          pt: "Quanto tempo leva para começar a trabalhar comigo?",
          en: "How long does it take to start working with you?",
        },
        answer: {
          pt: "Após a nossa chamada inicial e definição do escopo de trabalho, posso começar em até 48 horas para tarefas simples. Para projetos mais complexos, o prazo de início é geralmente de uma semana.",
          en: "After our initial call and definition of the work scope, I can start within 48 hours for simple tasks. For more complex projects, the start time is usually one week.",
        },
        isActive: true,
      },
      {
        id: "4",
        question: {
          pt: "Você assina acordos de confidencialidade (NDA)?",
          en: "Do you sign non-disclosure agreements (NDAs)?",
        },
        answer: {
          pt: "Sim, assino acordos de confidencialidade para todos os clientes. A privacidade e segurança das suas informações são prioridades absolutas no meu trabalho.",
          en: "Yes, I sign confidentiality agreements for all clients. The privacy and security of your information are absolute priorities in my work.",
        },
        isActive: true,
      },
      {
        id: "5",
        question: {
          pt: "Quais ferramentas e softwares você utiliza?",
          en: "What tools and software do you use?",
        },
        answer: {
          pt: "Tenho experiência com diversas ferramentas, incluindo Microsoft Office, Google Workspace, Trello, Asana, Notion, Canva, WordPress, Shopify, entre outras. Posso adaptar-me às ferramentas que você já utiliza ou recomendar soluções adequadas às suas necessidades.",
          en: "I have experience with various tools, including Microsoft Office, Google Workspace, Trello, Asana, Notion, Canva, WordPress, Shopify, among others. I can adapt to the tools you already use or recommend solutions suitable for your needs.",
        },
        isActive: true,
      },
    ]

    setFaqs(mockFaqs)
  }, [])

  // Handle form input changes
  const handleInputChange = (lang: string, field: "question" | "answer", value: string) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [lang]: value,
      },
    })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked,
    })
  }

  // Add new FAQ
  const handleAddFaq = () => {
    setIsLoading(true)

    // In a real application, this would be an API call
    setTimeout(() => {
      const newFaq: FAQ = {
        ...formData,
        id: Date.now().toString(), // Generate a unique ID
      }

      setFaqs([...faqs, newFaq])
      setFormData(initialFormState)
      setIsAddDialogOpen(false)
      setIsLoading(false)

      toast({
        title: "FAQ adicionada",
        description: "A nova FAQ foi adicionada com sucesso.",
      })
    }, 1000)
  }

  // Edit FAQ
  const handleEditFaq = () => {
    if (!currentFaq) return

    setIsLoading(true)

    // In a real application, this would be an API call
    setTimeout(() => {
      const updatedFaqs = faqs.map((faq) =>
        faq.id === currentFaq.id
          ? {
              ...faq,
              question: formData.question,
              answer: formData.answer,
              isActive: formData.isActive,
            }
          : faq,
      )

      setFaqs(updatedFaqs)
      setCurrentFaq(null)
      setFormData(initialFormState)
      setIsEditDialogOpen(false)
      setIsLoading(false)

      toast({
        title: "FAQ atualizada",
        description: "A FAQ foi atualizada com sucesso.",
      })
    }, 1000)
  }

  // Delete FAQ
  const handleDeleteFaq = (id: string) => {
    setIsLoading(true)

    // In a real application, this would be an API call
    setTimeout(() => {
      const updatedFaqs = faqs.filter((faq) => faq.id !== id)
      setFaqs(updatedFaqs)
      setIsLoading(false)

      toast({
        title: "FAQ removida",
        description: "A FAQ foi removida com sucesso.",
      })
    }, 1000)
  }

  // Open edit dialog with FAQ data
  const openEditDialog = (faq: FAQ) => {
    setCurrentFaq(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-gray-100">
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="bg-white border-b h-16 flex items-center px-6">
            <Link href="/admin/dashboard/pages" className="flex items-center text-gray-700 mr-6">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Voltar</span>
            </Link>
            <h2 className="text-lg font-medium">Gerenciar FAQs</h2>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Perguntas Frequentes (FAQ)</CardTitle>
                      <CardDescription>
                        Gerencie as perguntas frequentes exibidas na página de serviços.
                      </CardDescription>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar FAQ
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Adicionar Nova FAQ</DialogTitle>
                          <DialogDescription>
                            Preencha os campos abaixo para adicionar uma nova pergunta frequente.
                          </DialogDescription>
                        </DialogHeader>

                        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                          <TabsList className="mb-4">
                            <TabsTrigger value="pt">Português</TabsTrigger>
                            <TabsTrigger value="en">English</TabsTrigger>
                          </TabsList>

                          <TabsContent value="pt" className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-question">Pergunta</Label>
                              <Input
                                id="pt-question"
                                value={formData.question.pt}
                                onChange={(e) => handleInputChange("pt", "question", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="pt-answer">Resposta</Label>
                              <Textarea
                                id="pt-answer"
                                value={formData.answer.pt}
                                onChange={(e) => handleInputChange("pt", "answer", e.target.value)}
                                rows={5}
                              />
                            </div>
                          </TabsContent>

                          <TabsContent value="en" className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="en-question">Question</Label>
                              <Input
                                id="en-question"
                                value={formData.question.en}
                                onChange={(e) => handleInputChange("en", "question", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="en-answer">Answer</Label>
                              <Textarea
                                id="en-answer"
                                value={formData.answer.en}
                                onChange={(e) => handleInputChange("en", "answer", e.target.value)}
                                rows={5}
                              />
                            </div>
                          </TabsContent>
                        </Tabs>

                        <div className="flex items-center space-x-2 mt-4">
                          <Switch id="active-status" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
                          <Label htmlFor="active-status">Ativo</Label>
                        </div>

                        <DialogFooter className="mt-6">
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>
                            Cancelar
                          </Button>
                          <Button onClick={handleAddFaq} disabled={isLoading}>
                            {isLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                Salvando...
                              </>
                            ) : (
                              "Adicionar FAQ"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium">Nenhuma FAQ encontrada</p>
                        <p className="mt-1">Clique em "Adicionar FAQ" para criar a primeira pergunta frequente.</p>
                      </div>
                    ) : (
                      faqs.map((faq) => (
                        <Card
                          key={faq.id}
                          className={`border ${faq.isActive ? "border-gray-200" : "border-gray-200 bg-gray-50"}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-medium text-lg mb-1">{faq.question.pt}</h3>
                                <p className="text-gray-500 text-sm mb-3">{faq.question.en}</p>
                                <div className="text-gray-700 mb-1">{faq.answer.pt}</div>
                                <div className="text-gray-500 text-sm italic">{faq.answer.en}</div>
                                {!faq.isActive && (
                                  <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    Inativo
                                  </div>
                                )}
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEditDialog(faq)}
                                  className="h-8 px-2"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Tem certeza que deseja excluir esta FAQ? Esta ação não pode ser desfeita.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteFaq(faq.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Excluir
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      {/* Edit FAQ Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar FAQ</DialogTitle>
            <DialogDescription>Edite os campos abaixo para atualizar a pergunta frequente.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="pt">Português</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>

            <TabsContent value="pt" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-pt-question">Pergunta</Label>
                <Input
                  id="edit-pt-question"
                  value={formData.question.pt}
                  onChange={(e) => handleInputChange("pt", "question", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-pt-answer">Resposta</Label>
                <Textarea
                  id="edit-pt-answer"
                  value={formData.answer.pt}
                  onChange={(e) => handleInputChange("pt", "answer", e.target.value)}
                  rows={5}
                />
              </div>
            </TabsContent>

            <TabsContent value="en" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-en-question">Question</Label>
                <Input
                  id="edit-en-question"
                  value={formData.question.en}
                  onChange={(e) => handleInputChange("en", "question", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-en-answer">Answer</Label>
                <Textarea
                  id="edit-en-answer"
                  value={formData.answer.en}
                  onChange={(e) => handleInputChange("en", "answer", e.target.value)}
                  rows={5}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center space-x-2 mt-4">
            <Switch id="edit-active-status" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="edit-active-status">Ativo</Label>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleEditFaq} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthCheck>
  )
}
