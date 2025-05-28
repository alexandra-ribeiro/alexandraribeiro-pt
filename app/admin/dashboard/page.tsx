"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, FileText, User, Mail, Settings, LogOut } from "lucide-react"
import RouteGuard from "@/components/auth/route-guard"

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <RouteGuard>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-white border-r">
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link href="/admin/dashboard" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100">
              <Home className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/dashboard/pages"
              className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>Páginas</span>
            </Link>
            <Link
              href="/admin/dashboard/about"
              className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <User className="w-5 h-5 mr-3" />
              <span>Sobre</span>
            </Link>
            <Link
              href="/admin/dashboard/contact"
              className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Mail className="w-5 h-5 mr-3" />
              <span>Contato</span>
            </Link>
            <Link
              href="/admin/dashboard/users"
              className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <User className="w-5 h-5 mr-3" />
              <span>Usuários</span>
            </Link>
            <Link
              href="/admin/dashboard/settings"
              className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Configurações</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Sair</span>
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="bg-white border-b h-16 flex items-center justify-between px-6">
            <h2 className="text-lg font-medium">Bem-vindo, {session?.user?.name || "Administrador"}</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/admin/login" })}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total de Páginas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">6</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Idiomas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">2</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Última Atualização</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium">{new Date().toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="pages">
                <TabsList className="mb-4">
                  <TabsTrigger value="pages">Páginas</TabsTrigger>
                  <TabsTrigger value="recent">Edições Recentes</TabsTrigger>
                </TabsList>
                <TabsContent value="pages">
                  <Card>
                    <CardHeader>
                      <CardTitle>Páginas do Site</CardTitle>
                      <CardDescription>Gerencie o conteúdo das páginas do seu site.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <Link href="/admin/dashboard/pages/home">
                            <div className="border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                              <h3 className="font-medium mb-1">Página Inicial</h3>
                              <p className="text-sm text-gray-500">Editar conteúdo da página inicial</p>
                            </div>
                          </Link>
                          <Link href="/admin/dashboard/pages/about">
                            <div className="border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                              <h3 className="font-medium mb-1">Sobre</h3>
                              <p className="text-sm text-gray-500">Editar conteúdo da página sobre</p>
                            </div>
                          </Link>
                          <Link href="/admin/dashboard/pages/services">
                            <div className="border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                              <h3 className="font-medium mb-1">Serviços</h3>
                              <p className="text-sm text-gray-500">Editar conteúdo da página de serviços</p>
                            </div>
                          </Link>
                          <Link href="/admin/dashboard/pages/faq">
                            <div className="border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                              <h3 className="font-medium mb-1">Perguntas Frequentes</h3>
                              <p className="text-sm text-gray-500">Gerenciar perguntas frequentes (FAQs)</p>
                            </div>
                          </Link>
                          <Link href="/admin/dashboard/pages/blog">
                            <div className="border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                              <h3 className="font-medium mb-1">Blog</h3>
                              <p className="text-sm text-gray-500">Gerenciar artigos do blog</p>
                            </div>
                          </Link>
                          <Link href="/admin/dashboard/pages/contact">
                            <div className="border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all">
                              <h3 className="font-medium mb-1">Contato</h3>
                              <p className="text-sm text-gray-500">Editar conteúdo da página de contato</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="recent">
                  <Card>
                    <CardHeader>
                      <CardTitle>Edições Recentes</CardTitle>
                      <CardDescription>Histórico das últimas alterações feitas no site.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-b pb-2">
                          <p className="font-medium">Página de Serviços</p>
                          <p className="text-sm text-gray-500">Atualizado em: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="border-b pb-2">
                          <p className="font-medium">Perguntas Frequentes</p>
                          <p className="text-sm text-gray-500">
                            Atualizado em: {new Date(Date.now() - 43200000).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="border-b pb-2">
                          <p className="font-medium">Página Sobre</p>
                          <p className="text-sm text-gray-500">
                            Atualizado em: {new Date(Date.now() - 86400000).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="border-b pb-2">
                          <p className="font-medium">Página Inicial</p>
                          <p className="text-sm text-gray-500">
                            Atualizado em: {new Date(Date.now() - 172800000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </RouteGuard>
  )
}
