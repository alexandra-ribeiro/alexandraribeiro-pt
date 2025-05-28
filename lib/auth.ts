import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Simple in-memory admin user
const ADMIN_USER = {
  id: "1",
  name: "Admin",
  email: "admin@example.com",
  username: "admin.av1",
  password: "5XIfAwEB7ZnC%K", // Plain text for simplicity
  role: "admin",
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Nome de usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          console.log("Attempting to authenticate user:", credentials.username)

          // Simple credential check
          if (
            (credentials.username === ADMIN_USER.username || credentials.username === ADMIN_USER.email) &&
            credentials.password === ADMIN_USER.password
          ) {
            console.log("Authentication successful for:", credentials.username)

            return {
              id: ADMIN_USER.id,
              email: ADMIN_USER.email,
              name: ADMIN_USER.name,
              role: ADMIN_USER.role,
              isAdmin: true,
            }
          }

          console.log("Invalid credentials for:", credentials.username)
          return null
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-do-not-use-in-production",
  debug: process.env.NODE_ENV === "development",
}
