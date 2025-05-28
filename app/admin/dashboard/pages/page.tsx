"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, FileText, Home, Users, Mail, Newspaper, Info, HelpCircle } from "lucide-react"
import AuthCheck from "@/components/auth/auth-check"

export default function PagesManagementPage() {
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
            <h2 className="text-lg font-medium">Gerenciar Páginas</h2>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Páginas do Site</h1>
                <p className="text-gray-500">Gerencie o conteúdo das páginas do seu site em diferentes idiomas.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/admin/dashboard/pages/home">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Home className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>Página Inicial</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        Edite o conteúdo da página inicial, incluindo textos, imagens e seções principais.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/dashboard/pages/about">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Info className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>Página Sobre</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        Edite o conteúdo da página sobre, incluindo biografia, história e valores.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/dashboard/pages/services">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>Página de Serviços</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        Edite o conteúdo da página de serviços, incluindo descrições, categorias e preços.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/dashboard/pages/faq">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <HelpCircle className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>Perguntas Frequentes</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        Gerencie as perguntas frequentes (FAQs) exibidas na página de serviços.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/dashboard/pages/blog">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Newspaper className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>Blog</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        Gerencie os artigos do blog, crie novos conteúdos e edite os existentes.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/dashboard/pages/contact">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>Página de Contato</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        Edite o conteúdo da página de contato, incluindo formulário e informações de contato.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/admin/dashboard/users">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>Usuários</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        Gerencie os usuários com acesso ao painel administrativo.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthCheck>
  )
}
