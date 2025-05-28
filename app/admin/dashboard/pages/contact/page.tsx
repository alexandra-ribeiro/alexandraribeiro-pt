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

export default function ContactEditPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("pt")

  // Exemplo de dados iniciais
  const [formData, setFormData] = useState({
    pt: {
      title: "Contacto",
      description: "Entre em contacto para agendar uma conversa ou saber mais sobre os serviços de assistência virtual",
      subtitle:
        "Tem questões ou está pronto para começar? Preencha o formulário abaixo ou agende diretamente uma chamada de 15 minutos.",
      formTitle: "Envie uma mensagem",
      calendarTitle: "Agende uma chamada de 15 minutos",
      infoTitle: "Informações de contacto",
      email: "Email",
      location: "Localização",
      locationValue: "Porto, Portugal (Serviços remotos)",
      response: "Resposta garantida dentro de 24 horas em dias úteis",
      form: {
        name: "Nome",
        namePlaceholder: "Insira o seu nome",
        email: "Endereço de email",
        emailPlaceholder: "seu.email@exemplo.com",
        phone: "Número de telefone",
        phonePlaceholder: "Opcional",
        services: "Quais os serviços que lhe interessam?",
        servicesDescription: "Selecione uma ou mais opções",
        message: "Mensagem",
        messagePlaceholder: "Descreva brevemente como posso ajudar...",
        submit: "Enviar mensagem",
        submitting: "A enviar...",
      },
      serviceOptions: {
        virtualAssistance: "Assistência Virtual",
        crmErp: "Soluções de CRM & ERP",
        other: "Outro",
      },
      validation: {
        nameRequired: "Por favor insira o seu nome",
        emailInvalid: "Por favor insira um email válido",
        serviceRequired: "Selecione pelo menos um serviço",
      },
      formSuccess: {
        title: "Mensagem enviada!",
        message: "Obrigada pela sua mensagem. Responderei o mais brevemente possível.",
      },
      calendar: {
        title: "Calendário de Agendamento",
        subtitle: "Reserve um horário que lhe seja conveniente",
        placeholder: "Calendário de Agendamento",
        instructions: "Aqui será integrado um calendário para agendamento de chamadas (Calendly ou similar)",
        duration: "Duração",
        durationValue: "15 minutos",
        availability: "Disponibilidade",
        availabilityValue: "Segunda a Sexta, 9:00 - 17:00",
      },
    },
    en: {
      title: "Contact",
      description: "Get in touch to schedule a conversation or learn more about virtual assistance services",
      subtitle:
        "Have questions or ready to get started? Fill out the form below or directly schedule a 15-minute call.",
      formTitle: "Send a message",
      calendarTitle: "Schedule a 15-minute call",
      infoTitle: "Contact information",
      email: "Email",
      location: "Location",
      locationValue: "Porto, Portugal (Remote services)",
      response: "Response guaranteed within 24 hours on business days",
      form: {
        name: "Name",
        namePlaceholder: "Enter your name",
        email: "Email address",
        emailPlaceholder: "your.email@example.com",
        phone: "Phone number",
        phonePlaceholder: "Optional",
        services: "Which service or services are you interested in?",
        servicesDescription: "Select one or more options",
        message: "Message",
        messagePlaceholder: "Briefly describe how I can help...",
        submit: "Send message",
        submitting: "Sending...",
      },
      serviceOptions: {
        virtualAssistance: "Virtual Assistance",
        crmErp: "CRM & ERP Solutions",
        other: "Other",
      },
      validation: {
        nameRequired: "Please enter your name",
        emailInvalid: "Please enter a valid email",
        serviceRequired: "Please select at least one service",
      },
      formSuccess: {
        title: "Message sent!",
        message: "Thank you for your message. I will respond as soon as possible.",
      },
      calendar: {
        title: "Scheduling Calendar",
        subtitle: "Book a time that works for you",
        placeholder: "Scheduling Calendar",
        instructions: "A calendar for scheduling calls will be integrated here (Calendly or similar)",
        duration: "Duration",
        durationValue: "15 minutes",
        availability: "Availability",
        availabilityValue: "Monday to Friday, 9:00 AM - 5:00 PM",
      },
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
            <h2 className="text-lg font-medium">Editar Página de Contato</h2>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Página de Contato</CardTitle>
                      <CardDescription>Edite o conteúdo da página de contato em diferentes idiomas.</CardDescription>
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

                        <div className="space-y-2">
                          <Label htmlFor="pt-subtitle">Subtítulo</Label>
                          <Textarea
                            id="pt-subtitle"
                            value={formData.pt.subtitle}
                            onChange={(e) => handleInputChange("pt", "subtitle", e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="border-t pt-4 mt-6">
                          <h3 className="text-lg font-medium mb-4">Seção de Formulário</h3>

                          <div className="space-y-2 mb-4">
                            <Label htmlFor="pt-formTitle">Título do Formulário</Label>
                            <Input
                              id="pt-formTitle"
                              value={formData.pt.formTitle}
                              onChange={(e) => handleInputChange("pt", "formTitle", e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-name">Campo Nome</Label>
                              <Input
                                id="pt-form-name"
                                value={formData.pt.form.name}
                                onChange={(e) => handleNestedInputChange("pt", "form", "name", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-namePlaceholder">Placeholder Nome</Label>
                              <Input
                                id="pt-form-namePlaceholder"
                                value={formData.pt.form.namePlaceholder}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "form", "namePlaceholder", e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-email">Campo Email</Label>
                              <Input
                                id="pt-form-email"
                                value={formData.pt.form.email}
                                onChange={(e) => handleNestedInputChange("pt", "form", "email", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-emailPlaceholder">Placeholder Email</Label>
                              <Input
                                id="pt-form-emailPlaceholder"
                                value={formData.pt.form.emailPlaceholder}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "form", "emailPlaceholder", e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-phone">Campo Telefone</Label>
                              <Input
                                id="pt-form-phone"
                                value={formData.pt.form.phone}
                                onChange={(e) => handleNestedInputChange("pt", "form", "phone", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-phonePlaceholder">Placeholder Telefone</Label>
                              <Input
                                id="pt-form-phonePlaceholder"
                                value={formData.pt.form.phonePlaceholder}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "form", "phonePlaceholder", e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-services">Campo Serviços</Label>
                              <Input
                                id="pt-form-services"
                                value={formData.pt.form.services}
                                onChange={(e) => handleNestedInputChange("pt", "form", "services", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-servicesDescription">Descrição Serviços</Label>
                              <Input
                                id="pt-form-servicesDescription"
                                value={formData.pt.form.servicesDescription}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "form", "servicesDescription", e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-message">Campo Mensagem</Label>
                              <Input
                                id="pt-form-message"
                                value={formData.pt.form.message}
                                onChange={(e) => handleNestedInputChange("pt", "form", "message", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-messagePlaceholder">Placeholder Mensagem</Label>
                              <Input
                                id="pt-form-messagePlaceholder"
                                value={formData.pt.form.messagePlaceholder}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "form", "messagePlaceholder", e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-submit">Texto do Botão</Label>
                              <Input
                                id="pt-form-submit"
                                value={formData.pt.form.submit}
                                onChange={(e) => handleNestedInputChange("pt", "form", "submit", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-form-submitting">Texto do Botão (Enviando)</Label>
                              <Input
                                id="pt-form-submitting"
                                value={formData.pt.form.submitting}
                                onChange={(e) => handleNestedInputChange("pt", "form", "submitting", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-4 mt-6">
                          <h3 className="text-lg font-medium mb-4">Opções de Serviço</h3>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-serviceOptions-virtualAssistance">Assistência Virtual</Label>
                              <Input
                                id="pt-serviceOptions-virtualAssistance"
                                value={formData.pt.serviceOptions.virtualAssistance}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "serviceOptions", "virtualAssistance", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-serviceOptions-crmErp">CRM & ERP</Label>
                              <Input
                                id="pt-serviceOptions-crmErp"
                                value={formData.pt.serviceOptions.crmErp}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "serviceOptions", "crmErp", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-serviceOptions-other">Outro</Label>
                              <Input
                                id="pt-serviceOptions-other"
                                value={formData.pt.serviceOptions.other}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "serviceOptions", "other", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-4 mt-6">
                          <h3 className="text-lg font-medium mb-4">Seção de Calendário</h3>

                          <div className="space-y-2 mb-4">
                            <Label htmlFor="pt-calendarTitle">Título do Calendário</Label>
                            <Input
                              id="pt-calendarTitle"
                              value={formData.pt.calendarTitle}
                              onChange={(e) => handleInputChange("pt", "calendarTitle", e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-calendar-title">Título Interno</Label>
                              <Input
                                id="pt-calendar-title"
                                value={formData.pt.calendar.title}
                                onChange={(e) => handleNestedInputChange("pt", "calendar", "title", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-calendar-subtitle">Subtítulo</Label>
                              <Input
                                id="pt-calendar-subtitle"
                                value={formData.pt.calendar.subtitle}
                                onChange={(e) => handleNestedInputChange("pt", "calendar", "subtitle", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-calendar-duration">Texto Duração</Label>
                              <Input
                                id="pt-calendar-duration"
                                value={formData.pt.calendar.duration}
                                onChange={(e) => handleNestedInputChange("pt", "calendar", "duration", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-calendar-durationValue">Valor Duração</Label>
                              <Input
                                id="pt-calendar-durationValue"
                                value={formData.pt.calendar.durationValue}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "calendar", "durationValue", e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label htmlFor="pt-calendar-availability">Texto Disponibilidade</Label>
                              <Input
                                id="pt-calendar-availability"
                                value={formData.pt.calendar.availability}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "calendar", "availability", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pt-calendar-availabilityValue">Valor Disponibilidade</Label>
                              <Input
                                id="pt-calendar-availabilityValue"
                                value={formData.pt.calendar.availabilityValue}
                                onChange={(e) =>
                                  handleNestedInputChange("pt", "calendar", "availabilityValue", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="en" className="space-y-4">
                        {/* Conteúdo similar para o inglês */}
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

                        <div className="space-y-2">
                          <Label htmlFor="en-subtitle">Subtitle</Label>
                          <Textarea
                            id="en-subtitle"
                            value={formData.en.subtitle}
                            onChange={(e) => handleInputChange("en", "subtitle", e.target.value)}
                            rows={2}
                          />
                        </div>

                        {/* Outras seções para o inglês seguiriam o mesmo padrão */}
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
