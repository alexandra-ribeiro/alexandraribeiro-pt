"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, User } from "lucide-react"
import RouteGuard from "@/components/auth/route-guard"

interface UserType {
  id: string
  name: string
  email: string
  role: string
}

export default function UsersPage() {
  const [users] = useState<UserType[]>([
    {
      id: "1",
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
    },
  ])

  return (
    <RouteGuard>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b h-16 flex items-center px-6">
            <Link href="/admin/dashboard" className="flex items-center text-gray-700 mr-6">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Voltar</span>
            </Link>
            <h2 className="text-lg font-medium">Gerenciar Usuários</h2>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Usuários</CardTitle>
                  <CardDescription>Lista de usuários com acesso ao painel administrativo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-full mr-4">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </RouteGuard>
  )
}
